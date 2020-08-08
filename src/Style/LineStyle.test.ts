import { LineStyle } from './LineStyle';

// TODO: add a test to apply context?

test('constructor style creator must be correct', () => {
    const ls = new LineStyle({
        color: '#FFF',
        opacity: 0.4,
        type: 'dash',
        lineWidth: 4,
        lineCap: 'round',
        lineJoin: 'round',
        miterLimit: 1,
        dashSize: 15,
        dashDistance: 50,
    });
    expect(ls.color.r).toBe(255);
    expect(ls.color.g).toBe(255);
    expect(ls.color.b).toBe(255);
    expect(ls.opacity).toBe(0.4);
    expect(ls.type).toBe('dash');
    expect(ls.lineWidth).toBe(4);
    expect(ls.lineCap).toBe('round');
    expect(ls.lineJoin).toBe('round');
    expect(ls.miterLimit).toBe(1);
    expect(ls.dashSize).toBe(15);
    expect(ls.dashDistance).toBe(50);
});

test('getContextStyle must be return correct rgba', () => {
    const r = 255;
    const g = 0;
    const b = 0;
    const a = Math.random();
    const ls = new LineStyle({
        color: '#F00',
        opacity: a,
    });
    const style = ls.getContextStyle();
    expect(style).toBe(`rgba(${r}, ${g}, ${b}, ${a})`);
});
