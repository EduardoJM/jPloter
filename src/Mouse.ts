import { View } from './View';

export class Mouse {
    /**
     * the View.
     */
    view: View;

    /**
     * a boolean value indicating if the Mouse drag operations is active.
     */
    active: boolean;

    /**
     * a boolean value indicating if the Mouse zoom operations is active.
     */
    canZoom: boolean;

    /**
     * the minimum acceptable zoom value.
     */
    zoomMin: number;

    /**
     * the maximum acceptable zoom value.
     */
    zoomMax: number;

    /**
     * the zoom delta velocity.
     */
    zoomDelta: number;

    /**
     * the dragging start position x coordinate.
     */
    startX: number;
    
    /**
     * the dragging start position y coordinate.
     */
    startY: number;

    /**
     * a boolean value indicating if is current dragging.
     */
    dragging: boolean;

    onDragStopCallback?: () => void;
    
    onZoomChangeCallback?: () => void;

    private onDragStopEventHandlers: (() => void)[];

    private onZoomChangeEventHandler: (() => void)[];

    /**
     * creates a new instance of Mouse utilities for View.
     * @param canvasView the View to operate the mouse events.
     */
    constructor(canvasView: View) {
        this.active = false;
        this.canZoom = false;
        this.zoomMin = 1;
        this.zoomMax = 1000;
        this.zoomDelta = 4;
        this.startX = 0;
        this.startY = 0;
        this.dragging = false;
        this.view = canvasView;

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.wheel = this.wheel.bind(this);
        this.view.canvas.addEventListener('mousedown', this.mouseDown);
        this.view.canvas.addEventListener('wheel', this.wheel);

        this.onDragStopEventHandlers = [];
        this.onZoomChangeEventHandler = [];
    }

    /**
     * disable the drag operations.
     */
    disable(): void {
        this.active = false;
    }

    /**
     * enable the drag operations.
     */
    enable(): void {
        this.active = true;
    }

    /**
     * enable the zoom operations.
     */
    enableZoom(): void {
        this.canZoom = true;
    }

    /**
     * disable the zoom operations.
     */
    disableZoom(): void {
        this.canZoom = false;
    }

    /**
     * remove events.
     */
    remove(): void {
        this.view.canvas.removeEventListener('mousedown', this.mouseDown);
        this.view.canvas.removeEventListener('wheel', this.wheel);
    }

    /**
     * document mouseUp event.
     * @param e mouseUp event data.
     */
    mouseUp(): void {
        this.dragging = false;
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('mouseup', this.mouseUp);
        this.onDragStopEventHandlers.forEach((fn) => {
            fn.call(this);
        });
        if (this.onDragStopCallback) {
            this.onDragStopCallback.call(this);
        }
    }

    /**
     * document mouseMove event.
     * @param e mouseMove event data.
     */
    mouseMove(e: MouseEvent): void {
        if (!this.dragging) {
            return;
        }
        const rc = this.view.canvas.getBoundingClientRect();
        const px = e.pageX - rc.left;
        const py = e.pageY - rc.top;
        const dx = px - this.startX;
        const dy = py - this.startY;
        this.startX = px;
        this.startY = py;
        this.view.translation = {
            x: this.view.translation.x - dx / this.view.zoom.x,
            y: this.view.translation.y - dy / this.view.zoom.y,
        };
        this.view.render();
    }

    /**
     * canvas mouseDown event.
     * @param e mouseDown event data.
     */
    mouseDown(e: MouseEvent): void {
        if (!this.active) {
            return;
        }
        const rc = this.view.canvas.getBoundingClientRect();
        this.startX = e.pageX - rc.left;
        this.startY = e.pageY - rc.top;
        this.dragging = true;
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    }

    /**
     * canvas wheel event.
     * @param e wheel event data.
     */
    wheel(e: WheelEvent): void {
        if (!this.canZoom) {
            return;
        }
        const delta = (e.deltaY / Math.abs(e.deltaY)) * this.zoomDelta;
        // zoom
        const zoomX = Math.max(
            this.zoomMin,
            Math.min(
                this.zoomMax,
                this.view.zoom.x - delta
            )
        );
        const zoomY = Math.max(
            this.zoomMin,
            Math.min(
                this.zoomMax,
                this.view.zoom.y - delta
            )
        );
        if (zoomX === this.view.zoom.x && zoomY === this.view.zoom.y) {
            return;
        }
        // this translation is to zoom with the center in focus
        const w = this.view.canvas.width / this.view.zoom.x;
        const h = this.view.canvas.height / this.view.zoom.y;
        const nw = this.view.canvas.width / zoomX;
        const nh = this.view.canvas.height / zoomY;
        this.view.translation = {
            x: this.view.translation.x - ((nw - w) / 2),
            y: this.view.translation.y - ((nh - h) / 2),
        };
        this.view.zoom = {
            x: zoomX,
            y: zoomY
        };
        this.onZoomChangeEventHandler.forEach((fn) => {
            fn.call(this);
        });
        if (this.onZoomChangeCallback) {
            this.onZoomChangeCallback.call(this);
        }
        this.view.render();
    }

    /**
     * Add a new event listener to the Mouse.
     * @param event the event name.
     * @param fn the event function.
     */
    addEventListener(
        event: 'dragstop' | 'zoomchange',
        fn: () => void
    ): void {
        if (event === 'dragstop') {
            this.onDragStopEventHandlers.push(fn);
        } else if (event === 'zoomchange') {
            this.onZoomChangeEventHandler.push(fn);
        }
    }

    /**
     * Remove a event listener to the Mouse.
     * @param event the event name.
     * @param fn the event function.
     */
    removeEventListener(
        event: 'dragstop' | 'zoomchange',
        fn: () => void
    ): void {
        if (event === 'dragstop') {
            const idx = this.onDragStopEventHandlers.indexOf(fn);
            this.onDragStopEventHandlers.splice(idx, 1);
        } else if (event === 'zoomchange') {
            const idx = this.onZoomChangeEventHandler.indexOf(fn);
            this.onZoomChangeEventHandler.splice(idx, 1);
        }
    }
}
