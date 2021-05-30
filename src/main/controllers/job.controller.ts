import {
  Controller,
  Get,
  Query,
  UseGuards,
  Req,
  Delete,
  Post,
  Body,
  Param,
  Patch,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { JobService } from '../services/jobsOffers.service';
import { JobCreateDTO } from 'src/models/jobsOffers.dto';

@ApiTags('Job')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Put('save')
  async createJob(@Body() model: JobCreateDTO) {
    return await this.jobService.createJob(model);
  }

  @Get('all')
  async getAllJobs() {
    return await this.jobService.getAllJobList();
  }

  @Get(':id')
  async getJobById(@Param('id') id) {
    return await this.jobService.findById(id);
  }

  @Patch('quiz/:idJob/:idQuiz')
  async assignQuizToJob(@Param('idJob') idJob, @Param('idQuiz') idQuiz) {
    return await this.jobService.assignQuizToJob(idJob, idQuiz);
  }

  @Patch('quiz/:idJob')
  async removeQuizFromJob(@Param('idJob') idJob) {
    return await this.jobService.removeQuizFromJob(idJob);
  }

  @Delete()
  async delete(@Query('id') id) {
    return await this.jobService.delete(id);
  }
}
