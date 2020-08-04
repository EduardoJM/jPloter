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

export interface RenderItem {
    name: string;

    render: (view: View) => void;

    preBoundingCalculate?: (view: View) => void;

    getBounding: (view: View) => RenderItemBounds;
}
