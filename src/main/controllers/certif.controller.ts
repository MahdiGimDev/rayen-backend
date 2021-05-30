import { Body, Controller, Delete, Get, Param, Patch, Put, Query } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { CertifsDto, CertifsUpdateDTO } from "src/models/certifs.dto";
import { CertifsService } from "../services/certif.service";



@ApiTags('Certifs')
@Controller('certifs')
export class CertifsController {
  constructor(private readonly certifsService: CertifsService) {}

  @Put('save')
  async createCertifs(@Body() model: CertifsDto) {
    return await this.certifsService.createCertifs(model);
  }

  @Get('all')
  async getAllCertifs() {
    return await this.certifsService.getAllCertifsList();
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('update/:id')
  async updateCertifs(@Param('id') id, @Body() model: CertifsUpdateDTO) {
    return await this.certifsService.editCertifs(id, model);
  }

  @Delete()
  async delete(@Query('id') id) {
    return await this.certifsService.delete(id);
  }
}
