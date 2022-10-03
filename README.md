# slix

React powered Slides Framework

## Installation

```bash
npm install @frank-mayer/slix react react-dom framer-motion
```

Use a bundler like parcel or webpack to bundle your code.

## Usage

1. Create a element in your html file where you want the slides to be rendered.
1. Link your index.tsx file.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <main id="root"><!-- Render slides here --></main>
    <script src="index.tsx" type="module"></script>
  </body>
</html>
```

1. Call the `slix` function with a query selector for the element you want to render the slides in. This function returns a promise to the Slix instance, which you can use to control the slides.
1. Add a [controller](#controllers) to the slix instance, this includes basic navigation features. You can add multiple [controllers](#controllers) to a Slix instance. Base class is `BaseController`, you can extend it to create your own [controller](#controllers).
1. You can use the included style reset by calling the `resetCss` function if you want to.

```tsx
import { slix, resetCss, ArrowController } from "@frank-mayer/slix";

slix("#root", {
  slides: new Map([
    [1, <h1>Slide 1</h1>],
    [2, <h1>Slide 2</h1>],
    [3, <h1>Slide 3</h1>],
    [4, <h1>Slide 4</h1>],
  ]),
  initialSlide: 1,
}).then((slixInstance) => {
  ArrowController.attach(slixInstance);
});

resetCss();
```

## Dependencies

- [React](https://reactjs.org)
- [Framer Motion](https://www.framer.com/motion) for animations and transitions

## Recommended Libraries

- [howler](https://www.npmjs.com/package/howler) to play audio

## Controllers

### ArrowController

| Key | Action         |
| --- | -------------- |
| `→` | Next slide     |
| `←` | Previous slide |

### PowerPointController

| Key     | Action         |
| ------- | -------------- |
| `→`     | Next slide     |
| `Space` | Next slide     |
| `←`     | Previous slide |

## Keyboard controls

| Key | Action             |
| --- | ------------------ |
| `.` | Open control panel |
| `f` | Start fullscreen   |
