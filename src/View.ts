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

    renderList: RenderItem[];

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
        this.renderList = [];
    }

    render() {
        this.context.resetTransform();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const screenBounds = { left: 0, top: 0, right: this.canvas.width, bottom: this.canvas.height };
        this.renderList = this.items.filter((item) => {
            const rc = item.getBounding(this);
            if (screenBounds.left >= rc.right || rc.left >= screenBounds.right) {
                return false;
            }
            if (screenBounds.top >= rc.bottom || rc.top >= screenBounds.bottom) {
                return false;
            }
            return true;
        });
        console.log('rendering ', this.renderList.length, ' items');
        this.renderList.forEach((item) => {
            item.render(this);
        });
    }

    spacePointToCanvas(x: number, y: number) {
        return {
            x: (x - this.translation.x) * this.zoom.x,
            y: -(y + this.translation.y) * this.zoom.y,
        };
    }

    canvasPointToSpace(x: number, y: number) {
        return {
            x: x / this.zoom.x - this.translation.x,
            y: y / this.zoom.y,
        };
    }
}
