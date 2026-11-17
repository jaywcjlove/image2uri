import fs from 'fs';
import http from 'http';
import os from 'os';
import path from 'path';
import image2uri, { extTypeMap, ExtType, validUrl } from '../src';

it('test uiw.bm', () => {
  const bmPath = path.join(__dirname, 'imgs', 'uiw.bm');
  const uri = image2uri(bmPath);
  const ext = path.extname(bmPath) as ExtType;
  expect(image2uri).toBeDefined()
  expect(typeof uri).toBe('string');
  // @ts-ignore
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.bmp', () => {
  const bmpPath = path.join(__dirname, 'imgs', 'uiw.bmp');
  const uri = image2uri(bmpPath);
  const ext = path.extname(bmpPath) as ExtType;
  expect(typeof uri).toBe('string');
  // @ts-ignore
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.gif', () => {
  const gifPath = path.join(__dirname, 'imgs', 'uiw.gif');
  const uri = image2uri(gifPath);
  const ext = path.extname(gifPath) as ExtType;
  expect(typeof uri).toBe('string');
  // @ts-ignore
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.ico', () => {
  const icoPath = path.join(__dirname, 'imgs', 'uiw.ico');
  const uri = image2uri(icoPath)
  const ext = path.extname(icoPath) as ExtType;
  expect(typeof uri).toBe('string');
  // @ts-ignore
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.jpeg', () => {
  const jpegPath = path.join(__dirname, 'imgs', 'uiw.jpeg');
  const uri = image2uri(jpegPath);
  const ext = path.extname(jpegPath) as ExtType;
  expect(typeof uri).toBe('string');
  // @ts-ignore
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw-jpeg', () => {
  const jpegPath = path.join(__dirname, 'imgs', 'uiw-jpeg');
  const uri = image2uri(jpegPath);
  const ext = path.extname(jpegPath) as ExtType;
  expect(typeof uri).toBe('string');
  // @ts-ignore
  expect(uri.indexOf('data:image')).toEqual(-1);
});

it('test uiw.jpg', () => {
  const jpgPath = path.join(__dirname, 'imgs', 'uiw.jpg');
  const uri = image2uri(jpgPath);
  const ext = path.extname(jpgPath) as ExtType;
  // @ts-ignore
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.png', () => {
  const pngPath = path.join(__dirname, 'imgs', 'uiw.png');
  const uri = image2uri(pngPath);
  const ext = path.extname(pngPath) as ExtType;
  expect(typeof uri).toBe('string');
  // @ts-ignore
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.svg', () => {
  const svgPath = path.join(__dirname, 'imgs', 'uiw.svg');
  const uri = image2uri(svgPath);
  const ext = path.extname(svgPath) as ExtType;
  // @ts-ignore
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test uiw.webp', () => {
  const webpPath = path.join(__dirname, 'imgs', 'uiw.webp');
  const uri = image2uri(webpPath);
  const ext = path.extname(webpPath) as ExtType;
  expect(typeof uri).toBe('string');
  // @ts-ignore
  expect(extTypeMap[ext]).toEqual(uri.replace(/^data:(.*);base64\,.+/, "$1"));
});

it('test https....', async () => {
  const body = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
  const server = http.createServer((_req, res) => {
    res.end(body);
  });
  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new Error('expected a TCP server address');
  }
  try {
    const uri = await image2uri(`http://127.0.0.1:${address.port}/u/1680273?v=4`, { ext: '.apng' });
    expect(uri.indexOf('data:image/apng;base64')).toEqual(0);
    expect(uri.endsWith(body.toString('base64'))).toBe(true);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }
});

it('lowercases an uppercase file extension', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'image2uri-'));
  const file = path.join(dir, 'IMG_0001.JPG');
  fs.writeFileSync(file, Buffer.from([0xff, 0xd8, 0xff]));
  try {
    const uri = image2uri(file) as string;
    expect(uri.indexOf('data:image/jpeg;base64,')).toEqual(0);
  } finally {
    fs.rmSync(dir, { recursive: true });
  }
});

it('lowercases an uppercase ext option', () => {
  const file = path.join(__dirname, 'imgs', 'uiw-jpeg');
  const uri = image2uri(file, { ext: '.JPEG' }) as string;
  expect(uri.indexOf('data:image/jpeg;base64,')).toEqual(0);
});

it('accepts localhost and IPv6 URLs with no dot in the path', () => {
  expect(validUrl('http://localhost:37887/avatar')).toBe(true);
  expect(validUrl('http://[::1]:37887/avatar')).toBe(true);
  expect(validUrl('https://user:pass@[::1]/avatar')).toBe(true);
  expect(validUrl('/tmp/uiw.png')).toBe(false);
  expect(validUrl('not a url')).toBe(false);
});

it('reads the MIME type from a URL pathname, ignoring query and fragment', async () => {
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
  const server = http.createServer((_req, res) => {
    res.end(png);
  });
  await new Promise<void>((resolve) => {
    server.listen(0, resolve);
  });
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new Error('expected a TCP server address');
  }
  const { port } = address;
  try {
    const withQuery = await image2uri(`http://127.0.0.1:${port}/logo.png?v=2`);
    const withFragment = await image2uri(`http://127.0.0.1:${port}/logo.PNG#section`);
    const localhost = await image2uri(`http://localhost:${port}/avatar`, { ext: '.png' });
    const ipv6 = await image2uri(`http://[::1]:${port}/avatar`, { ext: '.PNG' });
    expect(withQuery.indexOf('data:image/png;base64,')).toEqual(0);
    expect(withFragment.indexOf('data:image/png;base64,')).toEqual(0);
    expect(localhost.indexOf('data:image/png;base64,')).toEqual(0);
    expect(ipv6.indexOf('data:image/png;base64,')).toEqual(0);
    expect(withQuery.endsWith(png.toString('base64'))).toBe(true);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => err ? reject(err) : resolve());
    });
  }
});

