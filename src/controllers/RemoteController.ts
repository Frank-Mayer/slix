import type { ISlixComp } from "../ISlixComp";
import type { SlixKey } from "../Slix";
import { BaseController, controllerRegistry } from "./BaseController";

export class RemoteController<KEY extends SlixKey> extends BaseController<KEY> {
  constructor(slixEl: ISlixComp<KEY>) {
    super(slixEl);

    window.addEventListener("keydown", this.onKeyDown);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      this.next();
    } else if (e.key === "ArrowDown") {
      this.previous();
    }
  };

  public static attach<KEY extends SlixKey>(slixEl: ISlixComp<KEY>) {
    controllerRegistry.register(slixEl, new RemoteController(slixEl));
  }

  dispose() {
    window.removeEventListener("keydown", this.onKeyDown);
  }
}
