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
    switch (ev.key) {
      case ".":
        {
          const child = window.open(window.location.href);
          if (child) {
            children.push(child);
          }
        }
        break;

      case "f":
        {
          console.log("f key pressed, full screen");
          document.documentElement.requestFullscreen();
        }
        break;

      default:
        {
          console.log("key pressed", ev.key);
        }
        break;
    }
  });

  // on unload, close all children
  window.addEventListener("unload", () => {
    children.forEach((child) => child.close());
  });
}
