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
    render: (view: View) => void;

    getBounding: (view: View) => RenderItemBounds;
}
