import RenderItem from './RenderItem';
import View from '../View';

interface LineData {
    mode: 'parametric' | 'algebric';
    parametric?: {
        point: { x: number, y: number; };
        vector: { x: number, y: number; };
    };
    algebric?: {
        angularCoeficient: number;
        linearCoeficient: number;
    };
}

export default class Line implements RenderItem {
    data: LineData;

    constructor() {
        this.data = {
            mode: 'parametric',
            parametric: {
                point: { x: 0, y: 0 },
                vector: { x: 0, y: 1 },
            }
        };
    }

    setParametric(point: { x: number, y: number }, vector: { x: number, y: number }) {
        this.data = {
            mode: 'parametric',
            parametric: {
                point,
                vector,
            }
        }
    }

    render(
        context: CanvasRenderingContext2D,
        view: View,
        zoom: { x: number; y: number; },
        translate: { x: number; y: number; }
    ) {
        const left = view.translation.x * view.zoom.x;
        const top = view.translation.y * view.zoom.y;
        const right = left + view.canvas.width;
        const bottom = top + view.canvas.width;
        

        // P.x + alfa * V.x == left
        // P.y + alfa * V.y
        //

        /*
        const px = this.x * zoom.x;
        const py = this.y * zoom.y;
        const sx = 4;
        const sy = 4;
        console.log(px);
        console.log(py);
        context.fillStyle = this.color;
        context.fillRect(px + 2, py + 2, sx, sy);
        */
    }
};

