import ColorNames from './ColorNames';

export class Color {
    /**
     * red color component.
     */
    r: number;
    /**
     * green color component.
     */
    g: number;
    /**
     * blue color component.
     */
    b: number;

    /**
     * Create a new instance of Color class.
     */
    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
    }

    /**
     * Fix the red, green and blue components to the range 0-255.
     */
    fix(): void {
        this.r = Math.min(255, Math.max(0, Math.round(this.r)));
        this.g = Math.min(255, Math.max(0, Math.round(this.g)));
        this.b = Math.min(255, Math.max(0, Math.round(this.b)));
    }

    /**
     * Create a new Color instance from red, green and blue components.
     * @param r red component.
     * @param g green component.
     * @param b blue component.
     */
    static fromRgb(r: number, g: number, b: number): Color {
        const c = new Color();
        c.r = r;
        c.g = g;
        c.b = b;
        c.fix();
        return c;
    }

    /**
     * Create a new Color instance from hex color string.
     * @param hex the hex color string in the format #RRGGBB.
     */
    static fromHex(hex: string): Color {
        let hexStr = hex;
        if (hex.indexOf('#') > -1) {
            hexStr = hex.substring(1);
        }
        if (!/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexStr)) {
            return new Color();
        }
        if (hexStr.length === 3) {
            const r = hexStr[0];
            const g = hexStr[1];
            const b = hexStr[2];
            hexStr = `${r}${r}${g}${g}${b}${b}`;
        }
        const hexNumber = parseInt(hexStr, 16);
        return Color.fromRgb(
            hexNumber >> 16,
            (hexNumber & 0x00FF00) >> 8,
            (hexNumber & 0x0000FF)
        );
    }

    /**
     * Create a new Color instance from string.
     * @param str the color string.
     */
    static fromString(str: string): Color {
        const trimed = str.trim();
        if (trimed.indexOf('rgb(') === 0 
            && trimed.charAt(trimed.length - 1) === ')') {
            const split = trimed.substring(4, trimed.length - 1).split(',');
            if (split.length === 3) {
                const [r, g, b] = split.map((comp) => {
                    const num = parseInt(comp, 10);
                    if (isNaN(num)) {
                        return 0;
                    }
                    return num;
                });
                return Color.fromRgb(r, g, b);
            }
            return new Color();
        }
        if (Object.prototype.hasOwnProperty.call(ColorNames, trimed.toLowerCase())) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const hexStr = (ColorNames as any)[trimed.toLowerCase()] as string;
            return Color.fromHex(hexStr);
        }
        return Color.fromHex(str);
    }
}
