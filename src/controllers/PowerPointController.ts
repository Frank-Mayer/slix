import type { ISlixComp } from "../ISlixComp";
import { getSlixRoot } from "../lib/slixRoot";
import * as WindowManager from "../lib/WindowManager";
import type { SlixKey } from "../Slix";
import { BaseController, controllerRegistry } from "./BaseController";

export class PowerPointController<
  KEY extends SlixKey
> extends BaseController<KEY> {
  constructor(slixEl: ISlixComp<KEY>) {
    super(slixEl);

    window.addEventListener("keydown", this.onKeyDown);
    if (!WindowManager.isChild) {
      getSlixRoot().addEventListener("click", this.onClick);
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case " ":
        this.next();
        break;
      case "ArrowLeft":
        this.previous();
        break;
    }
  };

  private onClick = (e: MouseEvent) => {
    if (e.button === 0) {
      this.next();
    }
  };

  public static attach<KEY extends SlixKey>(slixEl: ISlixComp<KEY>) {
    controllerRegistry.register(slixEl, new PowerPointController(slixEl));
  }

  dispose() {
    window.removeEventListener("keydown", this.onKeyDown);
    if (!WindowManager.isChild) {
      getSlixRoot().removeEventListener("click", this.onClick);
    }
  }
}
