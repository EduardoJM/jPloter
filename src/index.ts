export * from './View';
export * from './Mouse';
// Styles
export * from './Color';
export * from './LineStyle';
// Items
export * from './Items/RenderItem';
export * from './Items/Point';
export * from './Items/Function';
export * from './Items/Axis';
// Complementary Items
export * from './Complementary/AreaUnderCurve';

import { View } from './View';
import { Mouse } from './Mouse';
import { Point } from './Items/Point';
import { Function } from './Items/Function';
import { Axis } from './Items/Axis';
// Complementary Items
import { AreaUnderCurve } from './Complementary/AreaUnderCurve';
// Styles
import { Color } from './Color';
import { LineStyle } from './LineStyle';

export default {
    View,
    Mouse,
    // Styles
    Styling: {
        Color,
        LineStyle
    },
    // Items
    Point,
    Axis,
    Function,
    // Complementary Items
    AreaUnderCurve
};
