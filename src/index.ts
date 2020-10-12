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
// Base Items
export * from './Base/RenderItem';
export * from './Base/Axis';
// Calculus
export * from './Calculus/AreaUnderCurve';
export * from './Calculus/FunctionItem';
// Geometry
export * from './Geometry/Point';
export * from './Geometry/PointCaptureCreateOptions';
export * from './Geometry/LineSegment';
export * from './Geometry/Circle';

export * from './Text/MathExpression';

import { View } from './View';
import { Mouse } from './Mouse';
import { SerializationUtils } from './SerializationUtils';
// Base Items
import { Axis } from './Base/Axis';
// Calculus
import { FunctionItem } from './Calculus/FunctionItem';
import { AreaUnderCurve } from './Calculus/AreaUnderCurve';
// Geometry
import { Point } from './Geometry/Point';
import { LineSegment } from './Geometry/LineSegment';
import { Circle } from './Geometry/Circle';
// Text
import { MathExpression } from './Text/MathExpression';
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
    AreaUnderCurve,
    LineSegment,
    Circle,
    // Text
    MathExpression
};
