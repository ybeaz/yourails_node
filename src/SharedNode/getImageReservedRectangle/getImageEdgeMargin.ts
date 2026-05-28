import { PositionInRectangleType } from 'yourails_common'

/**
 * Returns a margin tuple [top, right, bottom, left] that offsets the blur area
 * away from whichever image edges the rectangle touches, based on its position.
 *
 * Edge contact per position:
 *   TOP_LEFT     → top + left
 *   TOP_CENTER   → top only
 *   TOP_RIGHT    → top + right
 *   CENTER_LEFT  → left only
 *   CENTER       → none
 *   CENTER_RIGHT → right only
 *   BOTTOM_LEFT  → bottom + left
 *   BOTTOM_CENTER→ bottom only
 *   BOTTOM_RIGHT → bottom + right
 */

type GetImageEdgeMarginParamsType = {
  positionInRectangle: PositionInRectangleType
  offset: number // pixels
}

type MarginTuple = [top: number, right: number, bottom: number, left: number]

const EDGE_MARGIN_MAP: Record<PositionInRectangleType, MarginTuple> = {
  TOP_LEFT: [1, 0, 0, 1],
  TOP_CENTER: [1, 0, 0, 0],
  TOP_RIGHT: [1, 1, 0, 0],
  CENTER_LEFT: [0, 0, 0, 1],
  CENTER: [0, 0, 0, 0],
  CENTER_RIGHT: [0, 1, 0, 0],
  BOTTOM_LEFT: [0, 0, 1, 1],
  BOTTOM_CENTER: [0, 0, 1, 0],
  BOTTOM_RIGHT: [0, 1, 1, 0],
}

export const getImageEdgeMargin = ({
  // reserved for future orientation-specific overrides
  positionInRectangle,
  offset,
}: GetImageEdgeMarginParamsType): MarginTuple => {
  const mask = EDGE_MARGIN_MAP[positionInRectangle]
  return mask.map((flag) => flag * offset) as MarginTuple
}
