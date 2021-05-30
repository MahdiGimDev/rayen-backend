import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';
import * as fs from 'fs';
import * as uuidAPIKey from 'uuid-apikey';
import UUIDAPIKey  from '../../../node_modules/uuid-apikey/index.js';
@Injectable()
export class UploadService {
  
  uploadFile(file, prefix) {
    const uuidAPIKey = require('uuid-apikey');
        if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const data = file.buffer;
    const re = /(?:\.([^.]+))?$/;
    const extension = re.exec(file.originalname)[1]; // "txt"
    const name = uuidAPIKey.create().uuid;
    const imageName = `${prefix}_${name}.${extension}`;
    const relativePath = environment.uploadFolder + '/' + imageName;
    const newPath = environment.uploadPath + '/' + relativePath;
    fs.writeFileSync(newPath, data);
    return environment.uploadUrl + '/' + relativePath;
  }
}
