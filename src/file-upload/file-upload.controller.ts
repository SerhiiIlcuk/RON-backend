import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, UploadedFile, Res, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileUploadService } from './file-upload.service';
import { ApiConsumes, ApiBearerAuth, ApiImplicitHeader, ApiOkResponse, ApiOperation, ApiImplicitBody } from '@nestjs/swagger';
import { ImageUploadDto } from './dto/image-upload.dto';
import { FileUploadDto } from './dto/file-upload.dto';
import { AuthGuard } from '@nestjs/passport';
import {log} from 'console';

@Controller('file-upload')
export class FileUploadController {
  SERVER_URL: string;

  constructor(
    private readonly fileUploadService: FileUploadService,
  ) {
  }

  @Post('image')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'upload base64 type image' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async uploadImage(@Body() imageUploadDto: ImageUploadDto) {
    return await this.fileUploadService.uploadImage(imageUploadDto);
  }

  @Post('etc')
  @ApiConsumes('multipart/form-data')
  @ApiImplicitBody({
    name: 'file',
    description: 'Upload audio, video or pdf file here',
    type: FileUploadDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        // Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadFile(@UploadedFile() file, @Res() res: any) {
    return res.status(HttpStatus.OK).json({
      path: file.path,
    });
  }
}
