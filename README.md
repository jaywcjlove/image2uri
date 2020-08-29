Image To URI
---

![image2uri test](https://github.com/jaywcjlove/image2uri/workflows/image2uri%20test/badge.svg)
[![npm version](https://img.shields.io/npm/v/image2uri.svg)](https://www.npmjs.com/package/image2uri)
[![](https://img.shields.io/github/issues/jaywcjlove/image2uri.svg)](https://github.com/jaywcjlove/image2uri/releases)
[![](https://img.shields.io/github/forks/jaywcjlove/image2uri.svg)](https://github.com/jaywcjlove/image2uri/network)
[![](https://img.shields.io/github/stars/jaywcjlove/image2uri.svg)](https://github.com/jaywcjlove/image2uri/stargazers)
[![](https://img.shields.io/github/release/jaywcjlove/image2uri.svg)](https://github.com/jaywcjlove/image2uri/releases)

Convert image file to data URI. Support `.png`,`.gif`,`.jpg`,`.jpeg`,`.bm`,`.bmp`,`.webp`,`.ico`,`.svg`.

### Install

```bash
npm i image2uri
```

### Basic Usage

```js
import image2uri from "image2uri";

console.log(image2uri('./example.bmp'));
// data:image/bmp;base64,Qk0YCAAAAAAAADYAAAAoAAAAGAAAABwAAAABABgAAAAAAOIHAAA....
console.log(image2uri('./example.jpg'));
// data:image/jpeg;base64,Qk0YCAAAAAAAADYAAAAoAAAAGAAAABwAAAABABgAAAAAAOIHAAA....
```

### Development

```bash
npm run watch # Listen compile .ts files.
npm run build # compile .ts files.

npm run start
```