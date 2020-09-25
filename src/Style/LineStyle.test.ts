import { LineStyle } from './LineStyle';

test('constructor style creator must be correct', () => {
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
    const hex = `#${rHex}${gHex}${bHex}`;
    const opacity = Math.random();
    const lineWidth = Math.floor(Math.random() * 60) + 1; // 1 - 61

    const ls = new LineStyle({
        color: hex,
        opacity: opacity,
        type: 'dash',
        lineWidth: lineWidth,
        lineCap: 'round',
        lineJoin: 'round',
        miterLimit: 1,
        dashSize: 15,
        dashDistance: 50,
    });
    expect(ls.color.r).toBe(r);
    expect(ls.color.g).toBe(g);
    expect(ls.color.b).toBe(b);
    expect(ls.opacity).toBe(opacity);
    expect(ls.type).toBe('dash');
    expect(ls.lineWidth).toBe(lineWidth);
    expect(ls.lineCap).toBe('round');
    expect(ls.lineJoin).toBe('round');
    expect(ls.miterLimit).toBe(1);
    expect(ls.dashSize).toBe(15);
    expect(ls.dashDistance).toBe(50);
});

test('getContextStyle must be return correct rgba', () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = Math.random();
    const ls = new LineStyle({
        color: `rgb(${r}, ${g}, ${b})`,
        opacity: a,
    });
    const style = ls.getContextStyle();
    expect(style).toBe(`rgba(${r}, ${g}, ${b}, ${a})`);
});
