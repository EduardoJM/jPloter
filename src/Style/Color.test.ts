import { Color } from './Color';

test('Color.fromString with names must be correct', () => {
    const skyBlue = Color.fromString('SkyBlue');
    expect(skyBlue.r).toBe(135);
    expect(skyBlue.g).toBe(206);
    expect(skyBlue.b).toBe(235);
    const oliveDrab = Color.fromString('OliveDrab');
    expect(oliveDrab.r).toBe(107);
    expect(oliveDrab.g).toBe(142);
    expect(oliveDrab.b).toBe(35);
});

test('Color.fromRgb must be correct', () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = Color.fromRgb(r, g, b);
    expect(color.r).toBe(r);
    expect(color.g).toBe(g);
    expect(color.b).toBe(b);
});

test('fix color ranges in Color.fromRgb', () => {
    const r = 500;
    const g = Math.floor(Math.random() * 256);
    const b = -20;
    const color = Color.fromRgb(r, g, b);
    expect(color.r).toBe(255);
    expect(color.g).toBe(g);
    expect(color.b).toBe(0);
});

test('Color.fromHex must be correct', () => {
    // #RRGGBB
    const slateBlue = Color.fromHex('#6A5ACD');
    expect(slateBlue.r).toBe(106);
    expect(slateBlue.g).toBe(90);
    expect(slateBlue.b).toBe(205);
    // #RGB
    const cyan = Color.fromHex('#0FF');
    expect(cyan.r).toBe(0);
    expect(cyan.g).toBe(255);
    expect(cyan.b).toBe(255);
    // WITHOUT #
    const mediumAquaMarine = Color.fromHex('66CDAA');
    expect(mediumAquaMarine.r).toBe(102);
    expect(mediumAquaMarine.g).toBe(205);
    expect(mediumAquaMarine.b).toBe(170);
    const yellow = Color.fromHex('FF0');
    expect(yellow.r).toBe(255);
    expect(yellow.g).toBe(255);
    expect(yellow.b).toBe(0);
});
