import RenderItem from './RenderItem';
import View from '../View';

export interface PointCreateOptions {
    x?: number;
    y?: number;
    color?: string;
}

export default class Point implements RenderItem {
    x: number;

    y: number;

    color: string;

    constructor(opts?: PointCreateOptions) {
        this.x = 0;
        this.y = 0;
        this.color = 'black';

        if (opts) {
            if (opts.x !== null && opts.x !== undefined) {
                this.x = opts.x;
            }
            if (opts.y !== null && opts.y !== undefined) {
                this.y = opts.y;
            }
            if (opts.color !== null && opts.color !== undefined) {
                this.color = opts.color;
            }
        }
    }
    
    render(
        context: CanvasRenderingContext2D,
        view: View,
        zoom: { x: number; y: number; },
        translate: { x: number; y: number; }
    ) {
        const px = this.x * zoom.x;
        const py = this.y * zoom.y;
        const sx = 4;
        const sy = 4;
        console.log(px);
        console.log(py);
        context.fillStyle = this.color;
        context.fillRect(px + 2, py + 2, sx, sy);
    }
}
