import { View } from "../View";

export interface RenderItemBounds {
    /**
     * The left bounding position.
     */
    left: number;
    /**
     * The top bounding position.
     */
    top: number;
    /**
     * The right bounding position.
     */
    right: number;
    /**
     * The bottom bounding position.
     */
    bottom: number;
}

export interface RenderItemCreateOptions {
    /**
     * The RenderItem name.
     */
    name?: string;
}

export interface RenderItem {
    /**
     * The RenderItem name.
     */
    name: string;

    /**
     * render the item.
     */
    render: (view: View) => void;

    /**
     * executed before the getBounding method of all rendering items.
     */
    preBoundingCalculate?: (view: View) => void;

    /**
     * calcuate the bounding box of the item.
     */
    getBounding: (view: View) => RenderItemBounds;
}
