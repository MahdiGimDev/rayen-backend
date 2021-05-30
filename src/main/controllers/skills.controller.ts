import {
  Controller,
  Get,
  Query,
  Delete,
  Body,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SkillsDto, SkillsUpdateDTO } from 'src/models/skills.dto';
import { SkillsService } from '../services/skills.service';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Put('save')
  async createSkills(@Body() model: SkillsDto) {
    return await this.skillsService.createSkills(model);
  }

  @Get('all')
  async getAllSkills() {
    return await this.skillsService.getAllSkillsList();
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('update/:id')
  async updateSkills(@Param('id') id, @Body() model: SkillsUpdateDTO) {
    return await this.skillsService.editSkills(id, model);
  }

  @Delete()
  async delete(@Query('id') id) {
    return await this.skillsService.delete(id);
  }
}
