import { RenderItemBounds } from '../Items/RenderItem';

export function overlapBoundings(a: RenderItemBounds, b: RenderItemBounds) {
    if (a.left >= b.right || b.left >= a.right) {
        return false;
    }
    if (a.top >= b.bottom || b.top >= a.bottom) {
        return false;
    }
    return true;
}
