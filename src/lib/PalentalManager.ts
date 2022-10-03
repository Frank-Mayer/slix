export const isChild =
  Boolean(window.opener) &&
  window.opener.location.origin === window.location.origin;

const children = new Array<Window>();

export const getParent = (): Window => {
  if (isChild) {
    return window.opener;
  } else {
    throw new Error("Not a child window");
  }
};

if (!isChild) {
  window.addEventListener("keypress", (ev) => {
    if (ev.key === ".") {
      const child = window.open(window.location.href);
      if (child) {
        children.push(child);
      }
    }
  });

  // on unload, close all children
  window.addEventListener("unload", () => {
    children.forEach((child) => child.close());
  });
}
