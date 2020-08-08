import { PatternLineOptions } from './PatternLine';
import { SolidFillOptions } from './SolidFill';

export interface FillStyleOptions extends 
    PatternLineOptions,
    SolidFillOptions {
    type: string;
}
