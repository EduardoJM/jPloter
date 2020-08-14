/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { LineStyle } from '../Style/LineStyle';
import { Color } from '../Style/Color';
import { PatternLine } from '../Style/PatternLine';
import { FillStyle } from '../Style/FillStyle';
import { FillStyleOptions } from '../Style/FillStyleOptions';
import { SolidFill } from '../Style/SolidFill';

/**
 * Utility to apply props from CreateOptions objects to the class.
 * @param props createOptions object.
 * @param applyTo the object to apply the props.
 */
export function applyProps(props: any, applyTo: any): void {
    if (!props || !applyTo) {
        return;
    }
    const keys = Object.keys(props);
    keys.forEach((k) => {
        if (Object.prototype.hasOwnProperty.call(applyTo, k)
            && Object.prototype.hasOwnProperty.call(props, k)) {
            if (applyTo[k] instanceof LineStyle) {
                applyTo[k] = new LineStyle(props[k]);
            } else if (applyTo[k] instanceof Color) {
                applyTo[k] = Color.fromString(props[k]);
            } else if (applyTo[k] instanceof FillStyle) {
                applyTo[k] = createFillStyleFromOptions(props[k]);
            } else {
                applyTo[k] = props[k];
            }
        }
    });
}

export function createFillStyleFromOptions(opts: FillStyleOptions) {
    if (opts.type === 'patternLine') {
        return new PatternLine(opts);
    } else if (opts.type === 'solid') {
        return new SolidFill(opts);
    }
    return new SolidFill();
}
