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
