import type { ISlixComp } from "./ISlixComp";
import type { SlixKey } from "./Slix";

export class SlixPromiseWrapper<KEY extends SlixKey> {
  private _promise: Promise<ISlixComp<KEY>>;
  public get promise(): Promise<ISlixComp<KEY>> {
    return this._promise;
  }

  public resolve: (value: ISlixComp<KEY>) => void;

  constructor() {
    this._promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
}
