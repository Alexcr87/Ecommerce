import { Controller, Post, Param, UploadedFile, UseGuards, UseInterceptors, Req, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesRepository } from './file.repository';
import { AuthGuard } from '../modules/Auth/auth.guard';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileUploadDto } from './files.dto';



@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesRepository: FilesRepository) {}

  @ApiBearerAuth()
  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: FileUploadDto,
  })
  async uploadFile(
    @Req() request: Request & { user: any },
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, // 200KB
            message: 'El archivo es demasiado grande; debe ser menor a 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    ) file: Express.Multer.File,
  ) {
    console.log(request.user);
    const url = await this.filesRepository.uploadFile(file, id);
    return { imgUrl: url };
  }
}
