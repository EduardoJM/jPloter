import jPlot from '../src';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('plot') as HTMLCanvasElement;

    const view = new jPlot.View(canvas);
    view.items.push(new jPlot.Point({
        x: 0,
        y: 0,
        color: 'green',
    }));
    view.items.push(new jPlot.Point({
        x: 1,
        y: 1,
        color: '#CCC',
        stroke: true,
        strokeColor: '#000',
        strokeWidth: 4
    }));
    view.items.push(new jPlot.Point({
        x: 2,
        y: 2,
        color: 'pink',
    }));
    view.items.push(new jPlot.Point({
        x: 3,
        y: 3,
        color: 'purple',
    }));
    view.items.push(new jPlot.Point({
        x: 4,
        y: 4,
        color: 'red',
    }));
    const func = new jPlot.Function({
        color: 'black',
        lineWidth: 2,
        function: 'x^3'
    })
    view.items.push(func);
    view.items.push(new jPlot.Axis({
        xAxisWidth: 2,
        yAxisWidth: 2,
        xAxisThickStyle: 'lower',
        yAxisThickStyle: 'right',
        arrowSize: 15
    }));
    
    view.zoom = { x: 100, y: 100 };
    view.translation = { x: -2.5, y: -2.5 };

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

    const input = document.getElementById('func') as HTMLInputElement;
    input.addEventListener('keyup', () => {
        const functionValue = input.value;
        func.function = functionValue;
        view.render();
    });
    
    view.render();
});
