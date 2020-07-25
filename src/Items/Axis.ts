import RenderItem from './RenderItem';
import View from '../View';

export default class Axis implements RenderItem {
    render(view: View) {
        const { x: left, y: top }
            = view.spacePointToCanvas(view.translation.x, -view.translation.y);
        const right = left + view.canvas.width;
        const bottom = top - view.canvas.height;
        
        view.context.beginPath();
        view.context.moveTo(left, 0);
        view.context.lineTo(right, 0);
        view.context.strokeStyle = 'black';
        view.context.stroke();

        view.context.beginPath();
        view.context.moveTo(0, top);
        view.context.lineTo(0, bottom);
        view.context.strokeStyle = 'black';
        view.context.stroke();
    }
};

