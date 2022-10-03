let _slixRoot: HTMLElement | null = null;

export const getSlixRoot = () => {
  if (_slixRoot) {
    return _slixRoot;
  } else {
    throw new Error("Slix root not found");
  }
};

export const setSlixRoot = (el: HTMLElement) => {
  if (_slixRoot) {
    throw new Error("Slix root already set");
  }
  _slixRoot = el;
};
