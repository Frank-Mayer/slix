import type { Slix, SlixKey } from "../Slix";
import { BaseController } from "./BaseController";

export class ArrowController<KEY extends SlixKey> extends BaseController<KEY> {
  constructor(slixEl: Slix<KEY>) {
    super(slixEl);

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.next();
      } else if (e.key === "ArrowLeft") {
        this.previous();
      }
    });
  }
}
