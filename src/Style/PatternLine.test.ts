import { PatternLine } from './PatternLine';

// TODO: add a test to apply context?

test('constructor must be correct', () => {
    const pl = new PatternLine({
        baseColor: 'red',
        patternSize: 50,
        opacity: 0.4,
        lineStyle: {
            color: '#FFF',
            lineWidth: 20
        }
    });
    expect(pl.baseColor.r).toBe(255);
    expect(pl.baseColor.g).toBe(0);
    expect(pl.baseColor.b).toBe(0);
    expect(pl.patternSize).toBe(50);
    expect(pl.opacity).toBe(0.4);

    expect(pl.lineStyle.color.r).toBe(255);
    expect(pl.lineStyle.color.g).toBe(255);
    expect(pl.lineStyle.color.b).toBe(255);
    expect(pl.lineStyle.lineWidth).toBe(20);
});
