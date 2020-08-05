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
            applyTo[k] = props[k];
        }
    });
}
