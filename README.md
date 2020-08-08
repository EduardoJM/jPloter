<h1 align="center">jPlot</h1>

<h2 align="center">Dynamic Math Graphs Ploting in JavaScript.</h2>

<div align="center">
    <img src="demo/images/preview.png" />
</div>

<div align="center">
    <a href="https://github.com/EduardoJM/jplot"><img alt="GitHub License" src="https://img.shields.io/github/license/EduardoJM/jplot" /></a>
    <a href="https://github.com/EduardoJM/jplot"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/EduardoJM/jplot?style=social" /></a>
    <a href="https://www.npmjs.com/package/jplot"><img alt="npm" src="https://img.shields.io/npm/v/jplot" /></a>
</div>

This is a (in development) dynamic math graph ploting library. This project, and package, contains, for now, some Rendering Items, like the **Axis**, **Function**, **Point** and the **AreaUnderCurve** with some **LineStyle's** and some **FillStyle's** utilities.

## 1 Usage

### 1.1 Instaling from npm

```bash
npm install jplot --save
```

or

```bash
yarn add jplot
```

TODO: write this section in the future. For now, see the `demo/*` html.

### 1.2 Including in the web page

TODO: write this section in the future.

## 2 Building From Source

### 2.1 Clone the repository and install dependencies

```bash
git clone https://github.com/EduardoJM/jplot.git
cd jplot
yarn
```

or

```bash
git clone https://github.com/EduardoJM/jplot.git
cd jplot
npm install
```

### 2.2 Build the browser examples

```bash
yarn ex
```

or

```bash
npm run ex
```

And, now, open the `demo/index.html` and the demo is here.

### 2.3 Build the package version

```bash
yarn build
```

```bash
npm run build
```

## 3 Automatized tests

This project contain some development automatized tests with `jest`. The tests is not complete for now and is not the better tests of the development world (because i'm not an expert in automatized tests).

To run the tests, in the project folder run:

```bash
yarn test
```

or

```bash
npm run test
```

## 4 References

### 4.1 HTML5 Canvas

- [The HTML5 Canvas Handbook](http://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html)
- [CanvasRenderingContext2D - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

### 4.2 Colors

- [HTML Color Names](https://www.w3schools.com/colors/colors_names.asp)
