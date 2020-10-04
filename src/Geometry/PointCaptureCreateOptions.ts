import { CircleCapturePointOptions } from './Circle';
import { FunctionItemCapturePointOptions } from '../Calculus/FunctionItem';

export interface PointCaptureCreateOptions extends
    Partial<CircleCapturePointOptions>,
    Partial<FunctionItemCapturePointOptions> {
}
