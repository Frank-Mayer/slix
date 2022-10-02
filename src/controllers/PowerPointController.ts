import type { Slix, SlixKey } from "../Slix";
import { BaseController, controllerRegistry } from "./BaseController";

export class PowerPointController<
  KEY extends SlixKey
> extends BaseController<KEY> {
  constructor(slixEl: Slix<KEY>) {
    super(slixEl);

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("mousedown", this.onMouseDown);
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

  private onMouseDown = (e: MouseEvent) => {
    if (e.button === 0) {
      this.next();
    }
  };

  public static attach<KEY extends SlixKey>(slixEl: Slix<KEY>) {
    controllerRegistry.register(slixEl, new PowerPointController(slixEl));
  }

  dispose() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("mousedown", this.onMouseDown);
  }
}
