import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { prospectDto } from "src/models/prospect.dto";
import { ProspectionService } from '../services/prospection.service';


@ApiTags('Prospection')
@Controller('prospections')
export class ProspectionController {
  constructor(
    private readonly prosService: ProspectionService,

  ) {}

  @Post('save')
  async createProspect(@Body() model: prospectDto) {
    return await this.prosService.createProspect(model);
  }



  @Get('all')
  async getAllProspects() {
    return await this.prosService.getAllProspectionList();
  }

  @Get(':id')
  async getProspectById(@Param('id') id) {
    return await this.prosService.findById(id);
  }

  @Delete()
  async delete(@Query('id') id) {
    return await this.prosService.delete(id);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('update/:id')
  async updateProspect(@Param('id') id, @Body() model: any) {
    return await this.prosService.updateProspect(id, model);
  }




}