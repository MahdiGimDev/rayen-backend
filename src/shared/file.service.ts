import * as fs from 'fs';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
@Injectable()
export class FileService {
  async uploadAvatar(file: any, id: number) {
    const root = `./uploads/users/`;
    if (!fs.existsSync(root)) {
      fs.mkdirSync(root);
    }
    const folder = root + `user-00${id}/`;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    const path = folder + this.randomName(file, id);
    const fileStream = fs.createWriteStream(path);
    fileStream.write(file.buffer);
    fileStream.end();
    return path;
  }

  randomName(file, id) {
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `avatar${id}-${randomName}${fileExtName}`;
  }
}
