import { RenderItem } from './Items/RenderItem';
import { overlapBoundings } from './Utils/bounding';

export class View {
    /**
     * the HTMLCanvasElement to render the View.
     */
    canvas: HTMLCanvasElement;
    
    /**
     * the CanvasRenderingContext2D to render the View.
     */
    context: CanvasRenderingContext2D;

    /**
     * the zoom factor of the View.
     */
    zoom: {
        /**
         * x zoom factor of the View.
         */
        x: number;
        /**
         * y zoom factor of the View.
         */
        y: number;
    };

    /**
     * the View translation.
     */
    translation: {
        /**
         * x coordinate of the View translation.
         */
        x: number;
        /**
         * y coordinate of the View translation.
         */
        y: number;
    };

    /**
     * the items in this View.
     */
    items: RenderItem[];

    /**
     * evaluate expression method (used in Function object).
     */
    evaluate?: (expr: string, x: number) => number;

    /**
     * the current render list.
     */
    renderList: RenderItem[];

    private onRenderBeginEventHandlers: ((context: CanvasRenderingContext2D) => void)[];

    /**
     * creates a new instance of View.
     * @param canvas the HTMLCanvasElement to render.
     */
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

        this.onRenderBeginEventHandlers = [];
    }

    /**
     * render the view items.
     */
    render(): void {
        this.context.resetTransform();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.onRenderBeginEventHandlers.forEach((fn) => {
            fn.call(this, this.context);
        });

        const screenBounds = { left: 0, top: 0, right: this.canvas.width, bottom: this.canvas.height };
        // indicate to items if bounding calculation is needed
        this.items.forEach((item) => {
            if (item.preBoundingCalculate) {
                item.preBoundingCalculate(this);
            }
        });
        // calculate bounding and check if overlap to screen
        this.renderList = this.items.filter((item) => {
            const rc = item.getBounding(this);
            return overlapBoundings(screenBounds, rc);
        });
        
        this.renderList.forEach((item) => {
            item.render(this);
        });
    }

    /**
     * convert a real space point to canvas.
     * @param x the x point coordinate.
     * @param y the y point coordinate.
     */
    spacePointToCanvas(x: number, y: number): {
        x: number;
        y: number;
    } {
        return {
            x: (x - this.translation.x) * this.zoom.x,
            y: -(y + this.translation.y) * this.zoom.y,
        };
    }

    /**
     * convert a canvas point to real space.
     * @param x the x point coordinate.
     * @param y the y point coordinate.
     */
    canvasPointToSpace(x: number, y: number): {
        x: number;
        y: number;
    } {
        return {
            x: x / this.zoom.x - this.translation.x,
            y: y / this.zoom.y,
        };
    }

    /**
     * get a item by it name.
     * @param name the name to find the item in the list.
     */
    getItemByName(name: string): RenderItem | null {
        const filtered = this.items.filter((item) => {
            return (item.name === name);
        });
        if (filtered.length <= 0) {
            return null;
        }
        return filtered[0];
    }

    addEventListener(event: 'renderbegin', fn: (context: CanvasRenderingContext2D) => void): void {
        if (event === 'renderbegin') {
            this.onRenderBeginEventHandlers.push(fn);
        }
    }

    removeEventListener(event: 'renderbegin', fn: (context: CanvasRenderingContext2D) => void): void {
        if (event === 'renderbegin') {
            const idx = this.onRenderBeginEventHandlers.indexOf(fn);
            this.onRenderBeginEventHandlers.splice(idx, 1);
        }
    }
}
