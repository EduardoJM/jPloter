import { FillStyleOptions } from './FillStyleOptions';

export abstract class FillStyle {
    abstract applyTo(context: CanvasRenderingContext2D): void;

    abstract serialize(): FillStyleOptions;
}
