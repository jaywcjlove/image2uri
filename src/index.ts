import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export const validUrl = (url: string) => {
  try {
    const { protocol } = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
};
export const extTypeMap = {
  '.png': 'image/png',
  '.apng': 'image/apng',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.bm': 'image/bmp',
  '.bmp': 'image/bmp',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
}

export type ExtType =  keyof typeof extTypeMap;

const fileExt = (file: string) => {
  const target = validUrl(file) ? new URL(file).pathname : file;
  return path.extname(target);
};

export default function image2uri(file: string, options: { ext?: string } = {}): string | Promise<string> {
  const ext = (options.ext || fileExt(file)).toLowerCase() as ExtType;
  const contentType = extTypeMap[ext]
  if (validUrl(file)) {
    return fetch(file).then((response) => response.buffer()).then((buffer) => {
      return contentType ? `data:${contentType};base64,${buffer.toString('base64')}` : buffer.toString('base64');
    });
  }
  const image = fs.readFileSync(file);
  return contentType ? `data:${contentType};base64,${image.toString('base64')}` : image.toString('base64');
}