import { Color } from './Color';
import { PatternLine } from './PatternLine';

test('constructor must be correct', () => {
    const r1 = Math.floor(Math.random() * 255);
    const g1 = Math.floor(Math.random() * 255);
    const b1 = Math.floor(Math.random() * 255);
    const r2 = Math.floor(Math.random() * 255);
    const g2 = Math.floor(Math.random() * 255);
    const b2 = Math.floor(Math.random() * 255);
    const opacity = Math.random();
    const patternSize = Math.floor(Math.random() * 300) + 1; // 1 - 301
    const lineWidth = Math.floor(Math.random() * 60) + 1; // 1 - 61

    const pl = new PatternLine({
        baseColor: Color.fromRgb(r1, g1, b1).toString(),
        patternSize: patternSize,
        opacity: opacity,
        lineStyle: {
            color: Color.fromRgb(r2, g2, b2).toString(),
            lineWidth: lineWidth
        }
    });

    expect(pl.baseColor.r).toBe(r1);
    expect(pl.baseColor.g).toBe(g1);
    expect(pl.baseColor.b).toBe(b1);
    expect(pl.patternSize).toBe(patternSize);
    expect(pl.opacity).toBe(opacity);

    expect(pl.lineStyle.color.r).toBe(r2);
    expect(pl.lineStyle.color.g).toBe(g2);
    expect(pl.lineStyle.color.b).toBe(b2);
    expect(pl.lineStyle.lineWidth).toBe(lineWidth);
});
