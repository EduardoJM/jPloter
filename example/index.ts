import jPlot from '../src';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('plot') as HTMLCanvasElement;

    const view = new jPlot.View(canvas);
    const func = new jPlot.Function({
        color: 'black',
        lineWidth: 2,
        function: 'x^3'
    });
    func.name = 'f';
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
    
    const mouse = new jPlot.Mouse(view);
    mouse.enable();
    mouse.enableZoom();

    const input = document.getElementById('func') as HTMLInputElement;
    input.addEventListener('keyup', () => {
        const functionValue = input.value;
        func.function = functionValue;
        view.render();
    });
    
    view.render();
});
