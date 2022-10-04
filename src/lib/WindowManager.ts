export const isChild =
  Boolean(window.opener) &&
  window.opener.location.origin === window.location.origin;

const children = new Array<Window>();
export const getChildWindows = () =>
  children.filter(
    (w) => w.location.origin === window.location.origin
  ) as ReadonlyArray<Window>;

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
          const child = window.open(
            window.location.href,
            undefined,
            "popup=true"
          );
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

export const setHash = (hash: string) => {
  const url = new URL(window.location.href);
  url.hash = hash;
  if (isChild) {
    getParent().history.replaceState(null, "", url.href);
  } else {
    window.history.replaceState(null, "", url.href);
  }
};

export const getHash = (): string => {
  const url = new URL((isChild ? getParent() : window).location.href);
  return url.hash.replace(/^#/, "");
};
