import RenderItem from './RenderItem';
import View from '../View';

export default class PlotFunction implements RenderItem {
    render(
        context: CanvasRenderingContext2D,
        view: View,
        zoom: { x: number; y: number; },
        translate: { x: number; y: number; }
    ) {
        const left = view.translation.x;
        const top = view.translation.y;
        const right = left + view.canvas.width / view.zoom.x;
        const bottom = top + view.canvas.width / view.zoom.y;
        
        const steps = 200;
        
        const interval = (right - left) / steps;

        context.beginPath();
        let x = left;
        for (let i = 0; i < steps; i += 1) {
            const y = Math.exp(-x) * x * x;

            const displayX = x * view.zoom.x;
            const displayY = y * view.zoom.y;

            if (i === 0) {
                context.moveTo(displayX, displayY)
            } else {
                context.lineTo(displayX, displayY)
            }

            x += interval;
        }
        context.strokeStyle = 'orange';
        context.stroke();

        // console.log(left, top, right, bottom);
        

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

