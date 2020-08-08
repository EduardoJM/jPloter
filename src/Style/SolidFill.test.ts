import { SolidFill } from './SolidFill';

// TODO: add a test to apply context?

test('constructor must be correct', () => {
    const op = Math.random();
    const sf = new SolidFill({
        color: 'pEru',
        opacity: op,
    });
    expect(sf.color.r).toBe(205);
    expect(sf.color.g).toBe(133);
    expect(sf.color.b).toBe(63);
    expect(sf.opacity).toBe(op);
});
