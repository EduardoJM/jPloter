import { RenderItemBounds } from '../Items/RenderItem';

/**
 * Utility to check if two bounding boxes is overlaping.
 * @param a the bounding of the item A.
 * @param b the bounding of the item B.
 */
export function overlapBoundings(a: RenderItemBounds, b: RenderItemBounds) {
    if (a.left >= b.right || b.left >= a.right) {
        return false;
    }
    if (a.top >= b.bottom || b.top >= a.bottom) {
        return false;
    }
    return true;
}
