import { LineStyle } from '../Style/LineStyle';
import { Color } from '../Style/Color';

/**
 * Utility to apply props from CreateOptions objects to the class.
 * @param props createOptions object.
 * @param applyTo the object to apply the props.
 */
export function applyProps(props: any, applyTo: any) {
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
            } else {
                applyTo[k] = props[k];
            }
        }
    });
}
