import View from "../View";

export default interface RenderItem {
    render: (view: View) => void;
}
