import { isChild } from "../lib/PalentalManager";
import type { Slix, SlixKey } from "../Slix";
import { BaseController, controllerRegistry } from "./BaseController";

export class ArrowController<KEY extends SlixKey> extends BaseController<KEY> {
  constructor(slixEl: Slix<KEY>) {
    super(slixEl);

    window.addEventListener("keydown", this.onKeyDown);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      this.next();
    } else if (e.key === "ArrowLeft") {
      this.previous();
    }
  };

  public static attach<KEY extends SlixKey>(slixEl: Slix<KEY>) {
    if (!isChild) {
      controllerRegistry.register(slixEl, new ArrowController(slixEl));
    }
  }

  dispose() {
    window.removeEventListener("keydown", this.onKeyDown);
  }
}
