import jPloter from '../src';
import View from '../src/View';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('plot') as HTMLCanvasElement;

    const view = new jPloter.View(canvas);
    view.items.push(new jPloter.Point({
        x: 0,
        y: 0,
        color: 'black',
    }));
    view.items.push(new jPloter.Point({
        x: 1,
        y: 1,
        color: 'blue',
    }));
    view.items.push(new jPloter.Point({
        x: 2,
        y: 2,
        color: 'pink',
    }));
    view.items.push(new jPloter.Point({
        x: 3,
        y: 3,
        color: 'purple',
    }));
    view.items.push(new jPloter.Point({
        x: 4,
        y: 4,
        color: 'red',
    }));
    
    view.zoom = { x: 100, y: 100 };
    view.translation = { x: -1, y: -1 };

    let start = { x: 0, y: 0 };
    let capturing = false;
    canvas.addEventListener('mousedown', (e) => {
        capturing = true;
        const rc = canvas.getBoundingClientRect();
        start = {
            x: e.pageX - rc.left,
            y: e.pageY - rc.top,
        };
    });
    canvas.addEventListener('mouseup', (e) => {
        capturing = false;
    });
    canvas.addEventListener('mousemove', (e) => {
        if (capturing) {
            const rc = canvas.getBoundingClientRect();
            const px = e.pageX - rc.left;
            const py = e.pageY - rc.top;
            const dx = px - start.x;
            const dy = py - start.y;
            start = {
                x: px,
                y: py,
            };
            view.translation = {
                x: view.translation.x - dx / view.zoom.x,
                y: view.translation.y - dy / view.zoom.y,
            };
            view.render();
        }
    });
    
    view.render();
});
