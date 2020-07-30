import { RenderItem } from './Items/RenderItem';

export class View {
    canvas: HTMLCanvasElement;
    
    context: CanvasRenderingContext2D;

    zoom: {
        x: number;
        y: number;
    };

    translation: {
        x: number;
        y: number;
    }

    items: RenderItem[];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Invalid Canvas Element!');
        }
        this.context = context;
        this.zoom = {
            x: 1,
            y: 1,
        };
        this.translation = {
            x: 0,
            y: 0,
        };
        this.items = [];
    }

    render() {
        this.context.resetTransform();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.scale(1, -1);
        this.context.translate(
            -this.translation.x * this.zoom.x,
            this.translation.y * this.zoom.y
        );
        this.items.forEach((item) => {
            item.render(this);
        });
    }

    spacePointToCanvas(x: number, y: number) {
        return {
            x: x * this.zoom.x,
            y: y * this.zoom.y,
        };
    }

    canvasPointToSpace(x: number, y: number) {
        return {
            x: x / this.zoom.x,
            y: y / this.zoom.y,
        };
    }
}
