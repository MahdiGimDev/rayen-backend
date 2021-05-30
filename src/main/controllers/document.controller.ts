import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { DocumentDto } from 'src/models/document.dto';
import { DocumentService } from '../services/document.service';
import { MailerService } from '../services/mail.service';

@ApiTags('Document')
@Controller('documents')
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private mailer: MailerService,
  ) {}

  @Put('save')
  @UseInterceptors(FileInterceptor('file'))
  async createDocuments(@UploadedFile() file, @Body() model: DocumentDto) {
    return await this.documentService.createDocument(model, file);
  }
  
  @Get('all')
  async getAllMissions() {
    return await this.documentService.getAllDocumentList();
  }

  @Get(':id')
  async getMissionById(@Param('id') id) {
    return await this.documentService.getDocumentByid(id);
  }

  @Delete()
  async delete(@Query('id') id) {
    return await this.documentService.delete(id);
  }

  @Post('uploaddoc/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileCertif(@UploadedFile() file, @Param('id') id) {
    return await this.documentService.uploadDocument(file, id);
  }
  @ApiParam({ name: 'id', example: 1 })
  @Patch('update/:id')
  async updateProfile(@Param('id') id, @Body() model: any) {
    return await this.documentService.updateDocument(id, model);
  }

}
