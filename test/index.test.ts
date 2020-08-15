import path from 'path';
import image2uri, { extTypeMap, ExtType } from '../src';

it('test uiw.bm', () => {
  const bmPath = path.join(__dirname, 'imgs', 'uiw.bm');
  const uri = image2uri(bmPath);
  const ext = path.extname(bmPath) as ExtType;
  expect(image2uri).toBeDefined()
  expect(typeof uri).toBe('string');
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.bmp', () => {
  const bmpPath = path.join(__dirname, 'imgs', 'uiw.bmp');
  const uri = image2uri(bmpPath);
  const ext = path.extname(bmpPath) as ExtType;
  expect(typeof uri).toBe('string');
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.gif', () => {
  const gifPath = path.join(__dirname, 'imgs', 'uiw.gif');
  const uri = image2uri(gifPath);
  const ext = path.extname(gifPath) as ExtType;
  expect(typeof uri).toBe('string');
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.ico', () => {
  const icoPath = path.join(__dirname, 'imgs', 'uiw.ico');
  const uri = image2uri(icoPath)
  const ext = path.extname(icoPath) as ExtType;
  expect(typeof uri).toBe('string');
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.jpeg', () => {
  const jpegPath = path.join(__dirname, 'imgs', 'uiw.jpeg');
  const uri = image2uri(jpegPath);
  const ext = path.extname(jpegPath) as ExtType;
  expect(typeof uri).toBe('string');
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.jpg', () => {
  const jpgPath = path.join(__dirname, 'imgs', 'uiw.jpg');
  const uri = image2uri(jpgPath);
  const ext = path.extname(jpgPath) as ExtType;
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.png', () => {
  const pngPath = path.join(__dirname, 'imgs', 'uiw.png');
  const uri = image2uri(pngPath);
  const ext = path.extname(pngPath) as ExtType;
  expect(typeof uri).toBe('string');
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.svg', () => {
  const svgPath = path.join(__dirname, 'imgs', 'uiw.svg');
  const uri = image2uri(svgPath);
  const ext = path.extname(svgPath) as ExtType;
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.webp', () => {
  const webpPath = path.join(__dirname, 'imgs', 'uiw.webp');
  const uri = image2uri(webpPath);
  const ext = path.extname(webpPath) as ExtType;
  expect(typeof uri).toBe('string');
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});
