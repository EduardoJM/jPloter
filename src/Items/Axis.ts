import RenderItem from './RenderItem';
import View from '../View';

export default class Axis implements RenderItem {
    render(
        context: CanvasRenderingContext2D,
        view: View,
        zoom: { x: number; y: number; },
        translate: { x: number; y: number; }
    ) {
        const left = view.translation.x * view.zoom.x;
        const top = -view.translation.y * view.zoom.y;
        const right = left + view.canvas.width;
        const bottom = top - view.canvas.height;
        
        context.beginPath();
        context.moveTo(left, 0);
        context.lineTo(right, 0);
        context.strokeStyle = 'black';
        context.stroke();

        context.beginPath();
        context.moveTo(0, top);
        context.lineTo(0, bottom);
        context.strokeStyle = 'black';
        context.stroke();

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

