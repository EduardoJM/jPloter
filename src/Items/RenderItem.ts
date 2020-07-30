import { View } from "../View";

export interface RenderItem {
    render: (view: View) => void;
}
