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
  Put, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { JobService } from '../services/jobsOffers.service';
import { JobCreateDTO } from 'src/models/jobsOffers.dto';
import { VacationService } from '../services/vacation.service';
import { VacationDTO } from '../../models/vacation.dto';
import { VacationStatus1, VacationType } from '../../models/role.mode';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Vacations')
@Controller('vacations')
export class VacationController {
  constructor(private readonly vacationService: VacationService) {}

  @Put('save')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createJob(
    @Req() req,
    @UploadedFile() file,
    @Body() model: VacationDTO) {
    return await this.vacationService.createVacationRequest(req.user.id, model,file);
  }

  @Get('all')
  async getAllJobs() {
    return await this.vacationService.getAllVacations();
  }

  @Get('status/:status')
  async getAllUsersByRole(@Param('status') status) {
    if (!(status in VacationStatus1)) {
      throw new HttpException('Status Undefined', HttpStatus.BAD_REQUEST);
    }
    return await this.vacationService.getVacationsByStatus(status);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMyVacations(@Req() req) {
    return await this.vacationService.getVacationsByUser(req.user.id);
  }

  @Get('me/:status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMyVacationsStatus(@Req() req, @Param('status') status) {
    if (!(status in VacationStatus1)) {
      throw new HttpException('Status Undefined', HttpStatus.BAD_REQUEST);
    }
    return await this.vacationService.getVacationsByUserByStatus(req.user.id, status);
  }

  @Get('/user/:id')
  async getVacationsByUser(@Param('id') id) {
    return await this.vacationService.getVacationsByUser(id);
  }

  @Get('get/:id')
  async getVacation(@Param('id') id) {
    return await this.vacationService.getVacation(id);
  }

  @Patch('accept/:id')
  async acceptVacation(@Param('id') id) {
    return await this.vacationService.changeVacationStatus(
      id,
      VacationStatus1.ACCEPTED,
    );
  }


  @Post('uploadfile/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Param('id') id) {
    return await this.vacationService.uploadfile(file, id);
  }


  @Patch('refuse/:id')
  async refuseVacation(@Param('id') id) {
    return await this.vacationService.changeVacationStatus(
      id,
      VacationStatus1.REFUSED,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.vacationService.delete(id);
  }
}
