# jPlot

![jPlot Example](demo/images/demo.jpg)

This is a (in development) small math graph plot library that i'm, Eduardo Oliveira, developing for i use in my other personal projects. This project, and package, contains, for now, some Rendering Items, like the **Axis**, the **Function** and the **Point**. The **render** method of all of this items is created using some math translation and scale operations and, the most important (maybe?) is the **Function**. The **Function** item run, in the *"background"* the [mathjs](https://mathjs.org/) `math.evaluate` for the calculations and plot the function.

## Install

```bash
npm install jplot --save
```

## Usage

TODO: write the usage in the future. For now, see the `example/index.ts`.

## Build

### 1 - Clone the repository and install dependencies

```bash
git clone https://github.com/EduardoJM/jplot.git
cd jplot
npm install
```

### 2 - Build the browser example

```bash
npm run ex
```

And, now, open the `demo/index.html` and the demo is here.

### 3 - Build the package version

```bash
npm run build
```
