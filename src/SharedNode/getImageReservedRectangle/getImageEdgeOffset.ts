import { PositionInRectangleType } from 'yourails_common'

/**
 * Returns a MarginTuple [top, right, bottom, left] representing how many pixels
 * to translate the blur rectangle away from the image edges it touches.
 *
 * Unlike a traditional margin (which shrinks the region), this tuple is meant
 * to be applied as a pure position translation:
 *   offsetX = marginLeft - marginRight
 *   offsetY = marginTop  - marginBottom
 * keeping targetWidth and targetHeight completely unchanged.
 *
 * Edge contact → shift direction:
 *   TOP_LEFT      → right + down  → [offset,      0, 0,      offset]
 *   TOP_CENTER    → down only     → [offset,      0, 0,      0     ]
 *   TOP_RIGHT     → left  + down  → [offset, offset, 0,      0     ]
 *   CENTER_LEFT   → right only    → [0,           0, 0,      offset]
 *   CENTER        → none          → [0,           0, 0,      0     ]
 *   CENTER_RIGHT  → left  only    → [0,      offset, 0,      0     ]
 *   BOTTOM_LEFT   → right + up    → [0,           0, offset, offset]
 *   BOTTOM_CENTER → up    only    → [0,           0, offset, 0     ]
 *   BOTTOM_RIGHT  → left  + up    → [0,      offset, offset, 0     ]
 */

type GetImageEdgeOffsetParamsType = {
  positionInRectangle: PositionInRectangleType
  offset: number // pixels
}

type MarginTuple = [top: number, right: number, bottom: number, left: number]

// [top, right, bottom, left] binary flags
const EDGE_SHIFT_MAP: Record<PositionInRectangleType, MarginTuple> = {
  TOP_LEFT: [1, -1, -1, 1],
  TOP_CENTER: [1, 0, -1, 0],
  TOP_RIGHT: [1, 1, -1, -1],
  CENTER_LEFT: [0, -1, 0, 1],
  CENTER: [-1, -1, -1, -1],
  CENTER_RIGHT: [0, 1, 0, -1],
  BOTTOM_LEFT: [-1, -1, 1, 1],
  BOTTOM_CENTER: [-1, 0, 1, 0],
  BOTTOM_RIGHT: [-1, 1, 1, -1],
}

export const getImageEdgeOffset = ({
  positionInRectangle,
  offset,
}: GetImageEdgeOffsetParamsType): MarginTuple =>
  EDGE_SHIFT_MAP[positionInRectangle].map((flag) => flag * offset) as MarginTuple
