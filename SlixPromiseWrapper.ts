import { Slix } from "./Slix";
import type { SlixKey } from "./Slix";

export class SlixPromiseWrapper<KEY extends SlixKey> {
  private _promise: Promise<Slix<KEY>>;
  public get promise(): Promise<Slix<KEY>> {
    return this._promise;
  }

  public resolve: (value: Slix<KEY>) => void;

  constructor() {
    this._promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
}
