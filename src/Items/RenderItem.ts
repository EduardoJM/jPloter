import View from "../View";

export default interface RenderItem {
    render: (
        context: CanvasRenderingContext2D,
        view: View,
        zoom: { x: number; y: number; },
        translate: { x: number; y: number; }
    ) => void;
}
