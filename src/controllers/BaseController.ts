import type { ISlixComp } from "../ISlixComp";
import type { SlixKey } from "../Slix";

export const controllerRegistry = new FinalizationRegistry<
  BaseController<SlixKey>
>((controller) => {
  (controller as any).dispose();
});

export abstract class BaseController<KEY extends SlixKey> {
  private _slixEl: WeakRef<ISlixComp<KEY>>;
  public get slixEl(): ISlixComp<KEY> {
    const slixEl = this._slixEl.deref();
    if (!slixEl) {
      this.dispose();
    }
    return slixEl!;
  }

  constructor(slixEl: ISlixComp<KEY>) {
    this._slixEl = new WeakRef(slixEl);
  }

  public next(): void {
    const slides = this.slixEl.slides;
    const currentIndex = slides.indexOf(this.slixEl.currentSlide);
    if (currentIndex < slides.length - 1) {
      this.slixEl.currentSlide = slides[currentIndex + 1];
    }
  }

  public previous(): void {
    const slides = this.slixEl.slides;
    const currentIndex = slides.indexOf(this.slixEl.currentSlide);
    if (currentIndex > 0) {
      this.slixEl.currentSlide = slides[currentIndex - 1];
    }
  }

  protected abstract dispose(): void;
}
