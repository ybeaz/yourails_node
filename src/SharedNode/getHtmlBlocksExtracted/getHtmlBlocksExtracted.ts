import * as cheerio from 'cheerio'
// const cheerio = require('cheerio')

import { FuncModeEnumType, withTryCatchFinallyWrapper } from 'yourails_common'

/**
 * @prompt Context: Unit tests typescript challenge
           Question: Suggest unit test data to test the function with the description below
           Format: Follow the format of the array of test-objects below
           [
             {
               index: 0,
               description: 'basic test getValidatedEntityLinksFilesReadable',
               params: {},
               options: {},
               expected: '',
             },
           ]
 */

type GetHtmlBlocksExtractedParamsType = {
  html: string
  cssSelectorsArr: string[]
}

type GetHtmlBlocksExtractedOptionsType = { funcParent?: string }

type GetHtmlBlockExtractedResType = {
  selector: string
  html: any
  matchCount: number
  error?: string
  usedFallback?: any
}

type GetHtmlBlocksExtractedType = (
  params: GetHtmlBlocksExtractedParamsType,
  options?: GetHtmlBlocksExtractedOptionsType,
) => GetHtmlBlockExtractedResType[]

const optionsDefault = {
  funcParent: 'getHtmlBlocksExtracted',
} satisfies Required<GetHtmlBlocksExtractedOptionsType>

const resDefault: GetHtmlBlockExtractedResType[] = []

/**
 * @description Function to extract HTML blocks matching given CSS selectors.
 *
 * Supports three special-case prefixes on top of standard CSS selectors:
 *   - "BEFORE:<selector>" — all [aria-labelledby] sections before the target (exclusive)
 *   - "AFTER:<selector>"  — all [aria-labelledby] sections after the target (exclusive)
 *   - "AFTER:<selA>BEFORE:<selB>" — all [aria-labelledby] sections strictly between
 *     the two targets (both exclusive)
 *
 * BEFORE: attempts a native :has() selector first and falls back to manual JS
 * filtering if :has() is unsupported or yields nothing. AFTER: and the combined
 * range form have no native CSS equivalent (no "preceding sibling" combinator
 * exists), so they always use manual filtering.
 *
 * @usage
   import { getHtmlBlocksExtracted, GetHtmlBlocksExtractedParamsType, GetHtmlBlocksExtractedOptionsType } from './getHtmlBlocksExtracted/getHtmlBlocksExtracted'
   const getHtmlBlocksExtractedParams: GetHtmlBlocksExtractedParamsType = {}
   const getHtmlBlocksExtractedOptions: GetHtmlBlocksExtractedOptionsType = {}
   getHtmlBlocksExtracted(getHtmlBlocksExtractedParams, getHtmlBlocksExtractedOptions)
*/
const getHtmlBlocksExtractedUnsafe: GetHtmlBlocksExtractedType = (
  { html, cssSelectorsArr }: GetHtmlBlocksExtractedParamsType,
  options: GetHtmlBlocksExtractedOptionsType = optionsDefault,
) => {
  const $ = cheerio.load(html)

  const resolveAnchorElement = (targetSelector: string) => {
    const match = $(targetSelector)
    return match.length > 0 ? match.get(0) : null
  }

  const getAllSections = () => $('section').toArray()

  // BEFORE:<selector>
  //
  // Target found:
  //   return sections before target.
  //
  // Target not found:
  //   return all sections.
  //
  // This preserves the existing BEFORE fallback behavior.
  const getSectionsBeforeTarget = (targetSelector: string) => {
    try {
      const hasSelector = `section:has(~ ${targetSelector})`
      const elements = $(hasSelector)

      if (elements.length > 0) {
        return {
          elements,
          usedFallback: false,
        }
      }
    } catch (err) {
      // :has() unsupported or malformed - use manual fallback.
    }

    const targetEl = resolveAnchorElement(targetSelector)
    const allSections = getAllSections()

    // Existing BEFORE behavior:
    // no target means there is nothing to stop at,
    // so return all sections.
    if (!targetEl) {
      return {
        elements: allSections,
        usedFallback: true,
      }
    }

    const matched: any[] = []

    for (const el of allSections) {
      if (el === targetEl) {
        break
      }

      matched.push(el)
    }

    return {
      elements: matched,
      usedFallback: true,
    }
  }

  // BEFORE_INCLUDE:<selector>
  //
  // Target found:
  //   return sections through and including target.
  //
  // Target not found:
  //   return all sections, matching BEFORE fallback semantics.
  const getSectionsBeforeTargetInclude = (targetSelector: string) => {
    const targetEl = resolveAnchorElement(targetSelector)

    if (!targetEl) {
      return {
        elements: [],
        usedFallback: true,
      }
    }

    const allSections = getAllSections()
    const matched: any[] = []

    for (const el of allSections) {
      matched.push(el)

      if (el === targetEl) {
        break
      }
    }

    return {
      elements: matched,
      usedFallback: true,
    }
  }

  // AFTER:<selector>
  //
  // Target found:
  //   return sections after target.
  //
  // Target not found:
  //   return no sections.
  const getSectionsAfterTarget = (targetSelector: string) => {
    const targetEl = resolveAnchorElement(targetSelector)

    if (!targetEl) {
      return {
        elements: [],
        usedFallback: true,
      }
    }

    const allSections = getAllSections()
    const matched: any[] = []
    let foundTarget = false

    for (const el of allSections) {
      if (el === targetEl) {
        foundTarget = true
        continue
      }

      if (foundTarget) {
        matched.push(el)
      }
    }

    return {
      elements: matched,
      usedFallback: true,
    }
  }

  // AFTER_INCLUDE:<selector>
  //
  // Target found:
  //   return target and all sections after it.
  //
  // Target not found:
  //   return no sections.
  const getSectionsAfterTargetInclude = (targetSelector: string) => {
    const targetEl = resolveAnchorElement(targetSelector)

    if (!targetEl) {
      return {
        elements: [],
        usedFallback: true,
      }
    }

    const allSections = getAllSections()
    const matched: any[] = []
    let foundTarget = false

    for (const el of allSections) {
      if (el === targetEl) {
        foundTarget = true
      }

      if (foundTarget) {
        matched.push(el)
      }
    }

    return {
      elements: matched,
      usedFallback: true,
    }
  }

  // Combined range:
  //
  // AFTER:A BEFORE:B
  //   excludes A and B.
  //
  // AFTER_INCLUDE:A BEFORE:B
  //   includes A, excludes B.
  //
  // AFTER:A BEFORE_INCLUDE:B
  //   excludes A, includes B.
  //
  // AFTER_INCLUDE:A BEFORE_INCLUDE:B
  //   includes A and B.
  //
  // Existing behavior:
  //   A not found -> no results.
  //   B not found -> continue through the end.
  const getSectionsBetweenTargetsWithOptions = (
    afterSelector: string,
    beforeSelector: string,
    includeAfter: boolean,
    includeBefore: boolean,
  ) => {
    const afterEl = resolveAnchorElement(afterSelector)
    const beforeEl = resolveAnchorElement(beforeSelector)
    const allSections = getAllSections()

    // Existing AFTER behavior:
    // if AFTER target cannot be resolved, return nothing.
    if (!afterEl) {
      return {
        elements: [],
        usedFallback: true,
      }
    }

    const matched: any[] = []
    let foundAfter = false

    for (const el of allSections) {
      if (!foundAfter) {
        if (el === afterEl) {
          foundAfter = true

          if (includeAfter) {
            matched.push(el)
          }

          // Same element is both boundaries.
          if (el === beforeEl) {
            break
          }
        }

        continue
      }

      // BEFORE target does not exist:
      // continue through the end of the document.
      if (beforeEl && el === beforeEl) {
        if (includeBefore) {
          matched.push(el)
        }

        break
      }

      matched.push(el)
    }

    return {
      elements: matched,
      usedFallback: true,
    }
  }

  const buildRangeResult = (selector: string, result: { elements: any; usedFallback: boolean }) => {
    const elementsArr = Array.isArray(result.elements) ? result.elements : result.elements.toArray()

    if (elementsArr.length === 0) {
      return {
        selector,
        html: null,
        matchCount: 0,
        ...(result.usedFallback !== undefined ? { usedFallback: result.usedFallback } : {}),
      }
    }

    const htmlBlocks = elementsArr.map((el: any) => $.html(el))

    return {
      selector,
      html: htmlBlocks.length === 1 ? htmlBlocks[0] : htmlBlocks,
      matchCount: elementsArr.length,
      usedFallback: result.usedFallback,
    }
  }

  return cssSelectorsArr.map((selector) => {
    /*
     * Combined AFTER / BEFORE selectors.
     *
     * Examples:
     *
     * AFTER:A BEFORE:B
     * AFTER_INCLUDE:A BEFORE:B
     * AFTER:A BEFORE_INCLUDE:B
     * AFTER_INCLUDE:A BEFORE_INCLUDE:B
     */
    if (selector.startsWith('AFTER_INCLUDE:') || selector.startsWith('AFTER:')) {
      const isAfterInclude = selector.startsWith('AFTER_INCLUDE:')

      const afterPrefix = isAfterInclude ? 'AFTER_INCLUDE:' : 'AFTER:'

      const rest = selector.slice(afterPrefix.length).trim()

      const beforeIncludeIdx = rest.indexOf('BEFORE_INCLUDE:')
      const beforeIdx = rest.indexOf('BEFORE:')

      let beforeIndex = -1
      let includeBefore = false

      if (beforeIncludeIdx !== -1) {
        beforeIndex = beforeIncludeIdx
        includeBefore = true
      } else if (beforeIdx !== -1) {
        beforeIndex = beforeIdx
      }

      try {
        if (beforeIndex !== -1) {
          const beforePrefix = includeBefore ? 'BEFORE_INCLUDE:' : 'BEFORE:'

          const afterSelector = rest.slice(0, beforeIndex).trim()

          const beforeSelector = rest.slice(beforeIndex + beforePrefix.length).trim()

          const result = getSectionsBetweenTargetsWithOptions(
            afterSelector,
            beforeSelector,
            isAfterInclude,
            includeBefore,
          )

          return buildRangeResult(selector, result)
        }

        // Plain AFTER / AFTER_INCLUDE.
        const afterSelector = rest.trim()

        const result = isAfterInclude
          ? getSectionsAfterTargetInclude(afterSelector)
          : getSectionsAfterTarget(afterSelector)

        return buildRangeResult(selector, result)
      } catch (error: any) {
        return {
          selector,
          html: null,
          matchCount: 0,
          error: `Failed to resolve AFTER selector: ${error?.message}`,
        }
      }
    }

    // BEFORE_INCLUDE:<selector>
    if (selector.startsWith('BEFORE_INCLUDE:')) {
      const targetSelector = selector.slice('BEFORE_INCLUDE:'.length).trim()

      try {
        const result = getSectionsBeforeTargetInclude(targetSelector)

        return buildRangeResult(selector, result)
      } catch (error: any) {
        return {
          selector,
          html: null,
          matchCount: 0,
          error: `Failed to resolve BEFORE_INCLUDE selector: ${error?.message}`,
        }
      }
    }

    // BEFORE:<selector>
    if (selector.startsWith('BEFORE:')) {
      const targetSelector = selector.slice('BEFORE:'.length).trim()

      try {
        const result = getSectionsBeforeTarget(targetSelector)

        return buildRangeResult(selector, result)
      } catch (error: any) {
        return {
          selector,
          html: null,
          matchCount: 0,
          error: `Failed to resolve BEFORE selector: ${error?.message}`,
        }
      }
    }

    // Standard CSS selector path.
    let elements: any

    try {
      elements = $(selector)
    } catch (error: any) {
      return {
        selector,
        html: null,
        matchCount: 0,
        error: `Invalid selector: ${error?.message}`,
      }
    }

    if (elements.length === 0) {
      return {
        selector,
        html: null,
        matchCount: 0,
      }
    }

    const htmlBlocks = elements.map((i: any, el: any) => $.html(el)).get()

    return {
      selector,
      html: htmlBlocks.length === 1 ? htmlBlocks[0] : htmlBlocks,
      matchCount: elements.length,
    }
  })
}

const getHtmlBlocksExtracted = withTryCatchFinallyWrapper<
  GetHtmlBlocksExtractedParamsType,
  GetHtmlBlocksExtractedOptionsType,
  GetHtmlBlockExtractedResType[]
>(getHtmlBlocksExtractedUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

type GetHtmlBlocksExtractedCaseType = {
  index: number
  description?: string
  params: Parameters<typeof getHtmlBlocksExtracted>[0]
  paramsWithAssignedDate?: { timestamp: number }
  options?: Parameters<typeof getHtmlBlocksExtracted>[1]
  expected: ReturnType<typeof getHtmlBlocksExtracted>
}

export type {
  GetHtmlBlockExtractedResType,
  GetHtmlBlocksExtractedCaseType,
  GetHtmlBlocksExtractedOptionsType,
  GetHtmlBlocksExtractedParamsType,
  GetHtmlBlocksExtractedType,
}
export { getHtmlBlocksExtracted }
