import type { Slix, SlixKey } from "../Slix";

export abstract class BaseController<KEY extends SlixKey> {
  private _slixEl: Slix<KEY>;
  public get slixEl(): Slix<KEY> {
    return this._slixEl;
  }

  constructor(slixEl: Slix<KEY>) {
    this._slixEl = slixEl;
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
}
