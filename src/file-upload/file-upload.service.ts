import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ImageUploadDto } from './dto/image-upload.dto';
import * as fs from 'fs';
import { getExtension } from 'mime';
import {log} from 'console';

@Injectable()
export class FileUploadService {
  async uploadImage(imageUploadDto: ImageUploadDto): Promise<any> {
    try {
      const decodedImg = this.decodeBase64Image(imageUploadDto.base64);
      const base64 = decodedImg.data;
      const type = decodedImg.type;
      const extension = getExtension(type);
      let path;
      if (extension) {
        path = './uploads/' + Date.now() + '.' + extension;
      } else {
        path = './uploads/' + Date.now() + '.' + 'png';
      }
      await fs.writeFileSync(path, base64, { encoding: 'base64' });
      return {path: path.slice(2)};
    } catch (error) {
      log(error);
      throw new InternalServerErrorException('Image Saving Error');
    }
  }

  private decodeBase64Image(dataString) {
    const matches = dataString.split(',');
    const response: any = {};

    response.type = matches[0].match(/[^:\s*]\w+\/[\w-+\d.\*]+(?=[;| ])/)[0];
    response.data = matches[1];

    return response;
  }
}
