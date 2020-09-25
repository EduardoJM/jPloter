import { Color } from './Color';
import ColorNames from './ColorNames';

test('Empty Color instantiated must be black', () => {
    const c = new Color();
    expect(c.r).toBe(0);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
});

test('Color.fix must be fix the range of color component', () => {
    const r = Math.floor(Math.random() * 255) + 256; // positive > 255
    const g = Math.floor(Math.random() * 255); // 0-255
    const b = Math.floor(Math.random() * 100) - 200; // < 0
    const c = new Color();
    c.r = r;
    c.g = g;
    c.b = b;
    expect(c.r).toBe(r);
    expect(c.g).toBe(g);
    expect(c.b).toBe(b);
    c.fix();
    expect(c.r).toBe(255);
    expect(c.g).toBe(g);
    expect(c.b).toBe(0);
});

test('Color.fromRgb must be create a color from rgb fixing ranges', () => {
    let r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let c = Color.fromRgb(r, g, b);
    expect(c.r).toBe(r);
    expect(c.g).toBe(g);
    expect(c.b).toBe(b);
    r = Math.floor(Math.random() * 255) + 256; // > 255
    b = Math.floor(Math.random() * 100) - 200; // < 0
    c = Color.fromRgb(r, g, b);
    expect(c.r).toBe(255);
    expect(c.g).toBe(g);
    expect(c.b).toBe(0);
});

test('Color.toString must be reloaded with fromString', () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const c1 = Color.fromRgb(r, g, b);
    const str = c1.toString();
    const c2 = Color.fromString(str);
    expect(c2.r).toBe(r);
    expect(c2.g).toBe(g);
    expect(c2.b).toBe(b);
});

test('Color.fromHex can parse colors with # and without it', () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    let rHex = r.toString(16);
    let gHex = g.toString(16);
    let bHex = b.toString(16);
    if (rHex.length === 1) {
        rHex = `0${rHex}`;
    }
    if (gHex.length === 1) {
        gHex = `0${gHex}`;
    }
    if (bHex.length === 1) {
        bHex = `0${bHex}`;
    }
    const hex1 = `#${rHex}${gHex}${bHex}`;
    const hex2 = `${rHex}${gHex}${bHex}`;
    const c1 = Color.fromHex(hex1);
    expect(c1.r).toBe(r);
    expect(c1.g).toBe(g);
    expect(c1.b).toBe(b);
    const c2 = Color.fromHex(hex2);
    expect(c2.r).toBe(r);
    expect(c2.g).toBe(g);
    expect(c2.b).toBe(b);
});

test('Color.fromHex can parse the FFFFFF or FFF format', () => {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    const d1 = digits[Math.floor(Math.random() * digits.length)];
    const d2 = digits[Math.floor(Math.random() * digits.length)];
    const d3 = digits[Math.floor(Math.random() * digits.length)];
    const hex1 = `${d1}${d2}${d3}`;
    const hex2 = `${d1}${d1}${d2}${d2}${d3}${d3}`;
    const c1 = Color.fromHex(hex2);
    const c2 = Color.fromHex(hex1);
    const c3 = Color.fromHex(`#${hex1}`);
    expect(c2.r).toBe(c1.r);
    expect(c2.g).toBe(c1.g);
    expect(c2.b).toBe(c1.b);
    expect(c3.r).toBe(c1.r);
    expect(c3.g).toBe(c1.g);
    expect(c3.b).toBe(c1.b);
});

test('Color.fromString must parse rgb(r, g, b) format', () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const c = `rgb(${r}, ${g}, ${b})`;
    const cl = Color.fromString(c);
    expect(cl.r).toBe(r);
    expect(cl.g).toBe(g);
    expect(cl.b).toBe(b);
});

test('Color.fromString must parse color from name', () => {
    const keys = Object.keys(ColorNames);
    keys.forEach((cl) => {
        let name = '';
        for (let i = 0; i < cl.length; i += 1) {
            const char = cl[i];
            if (Math.floor(Math.random() * 100) % 2 === 0) {
                name = `${name}${char.toLowerCase()}`;
            } else {
                name = `${name}${char.toUpperCase()}`;
            }
        }
        const hex = ColorNames[cl];
        const cl1 = Color.fromHex(hex);
        const cl2 = Color.fromString(name);
        expect(cl1.r).toBe(cl2.r);
        expect(cl1.g).toBe(cl2.g);
        expect(cl1.b).toBe(cl2.b);
    });
});

test('Color.fromString must parse color from hex', () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    let rHex = r.toString(16);
    let gHex = g.toString(16);
    let bHex = b.toString(16);
    if (rHex.length === 1) {
        rHex = `0${rHex}`;
    }
    if (gHex.length === 1) {
        gHex = `0${gHex}`;
    }
    if (bHex.length === 1) {
        bHex = `0${bHex}`;
    }
    const hex1 = `#${rHex}${gHex}${bHex}`;
    const hex2 = `${rHex}${gHex}${bHex}`;
    const c1 = Color.fromString(hex1);
    expect(c1.r).toBe(r);
    expect(c1.g).toBe(g);
    expect(c1.b).toBe(b);
    const c2 = Color.fromString(hex2);
    expect(c2.r).toBe(r);
    expect(c2.g).toBe(g);
    expect(c2.b).toBe(b);
});

test('Color.fromString with unknown format must be black', () => {
    const c = Color.fromString('3as234');
    expect(c.r).toBe(0);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
});
