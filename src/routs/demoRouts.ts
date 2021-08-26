import { ToolTipPage } from "./../modules/demo/components/toolTip/ToolTipPage";
import { IRoute } from "../interfaces/rout";
import { CropperPage } from "modules/demo/components/cropper/CropperPage";
import { TreeSelectPage } from "modules/demo/components/treeSelect/TreeSelectPage";
import { TogglePage } from "modules/demo/components/toggle/TogglePage";
import { DragDropPage } from "modules/demo/components/dragDrop/DragDropPage";

export const demoRouts: Record<string, IRoute> = {
  cropper: {
    title: "Cropper page",
    link: "/cropper",
    Component: CropperPage,
  },
  treeSelect: {
    title: "Tree Select",
    link: "/tree-select",
    Component: TreeSelectPage,
  },
  toolTip: {
    title: "Tool tip",
    link: "/tool-tip",
    Component: ToolTipPage,
  },
  toggle: {
    title: "Toggle",
    link: "/toggle",
    Component: TogglePage,
  },
  dragDrop: {
    title: "Drag&Drop",
    link: "/dragDrop",
    Component: DragDropPage,
  },
};
