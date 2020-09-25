import { SolidFill } from './SolidFill';

test('constructor must be correct', () => {
    const op = Math.random();
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const sf = new SolidFill({
        color: `rgb(${r}, ${g}, ${b})`,
        opacity: op,
    });
    expect(sf.color.r).toBe(r);
    expect(sf.color.g).toBe(g);
    expect(sf.color.b).toBe(b);
    expect(sf.opacity).toBe(op);
});
