# slix

React powered Slides Framework

## Installation

```bash
npm install @frank-mayer/slix react react-dom
```

Use a bundler like webpack or parcel to bundle your code.

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

Call the `slix` function with a query selector for the element you want to render the slides in.

```tsx
import { slix, ArrowController } from "@frank-mayer/slix";

const slixPromise = slix("#root", {
  slides: new Map([
    [1, <h1>Slide 1</h1>],
    [2, <h1>Slide 2</h1>],
    [3, <h1>Slide 3</h1>],
    [4, <h1>Slide 4</h1>],
  ]),
  initialSlide: 1,
});
```

Add a controller to the slix instance, you can add multiple controllers. Base class is `BaseController`, you can extend it to create your own controller.

```typescript
slixPromise.then((slixInstance) => {
  ArrowController.attach(slixInstance);
});
```

## Recommended Libraries

- [howler](https://www.npmjs.com/package/howler) to play audio
