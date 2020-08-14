export * from './View';
export * from './Mouse';
export * from './SerializationUtils';
// Styles
export * from './Style/Color';
export * from './Style/LineStyle';
export * from './Style/FillStyle';
export * from './Style/FillStyleOptions';
export * from './Style/PatternLine';
export * from './Style/SolidFill';
// Items
export * from './Items/RenderItem';
export * from './Items/Point';
export * from './Items/FunctionItem';
export * from './Items/Axis';
// Complementary Items
export * from './Complementary/AreaUnderCurve';

import { View } from './View';
import { Mouse } from './Mouse';
import { SerializationUtils } from './SerializationUtils';
// Items
import { Point } from './Items/Point';
import { FunctionItem } from './Items/FunctionItem';
import { Axis } from './Items/Axis';
// Complementary Items
import { AreaUnderCurve } from './Complementary/AreaUnderCurve';
// Styles
import { Color } from './Style/Color';
import { LineStyle } from './Style/LineStyle';
import { FillStyle } from './Style/FillStyle';
import { PatternLine } from './Style/PatternLine';
import { SolidFill } from './Style/SolidFill';

export default {
    View,
    Mouse,
    SerializationUtils,
    // Styles
    Styling: {
        Color,
        LineStyle,
        FillStyle,
        PatternLine,
        SolidFill
    },
    // Items
    Point,
    Axis,
    FunctionItem,
    // Complementary Items
    AreaUnderCurve
};
