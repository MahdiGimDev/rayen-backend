import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/guards/roles.guard";
import { ExperienceDTO } from "src/models/experience.dto";
import { ExperienceStatus1 } from "src/models/role.mode";
import { ExperienceService } from "../services/experience.service";


@ApiTags('Experiences')
@Controller('experiences')
export class ExperienceController {
  constructor(private readonly vacationService: ExperienceService) {}

  @Put('save')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createJob(@Req() req, @Body() model: ExperienceDTO) {
    return await this.vacationService.createFormationRequest(req.user.id, model);
  }

  @Get('all')
  async getAllJobs() {
    return await this.vacationService.getAllExperiences();
  }

  @Get('status/:status')
  async getAllUsersByRole(@Param('status') status) {
    if (!(status in ExperienceStatus1)) {
      throw new HttpException('Status Undefined', HttpStatus.BAD_REQUEST);
    }
    return await this.vacationService.getExperiencesByStatus(status);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMyVacations(@Req() req) {
    return await this.vacationService.getVacationsByUser(req.user.id);
  }

  @Get('me/:status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMyVacationsStatus(@Req() req, @Param('status') status) {
    if (!(status in ExperienceStatus1)) {
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
      ExperienceStatus1.ACCEPTED,
    );
  }

  @Patch('refuse/:id')
  async refuseVacation(@Param('id') id) {
    return await this.vacationService.changeVacationStatus(
      id,
      ExperienceStatus1.REFUSED,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.vacationService.delete(id);
  }
}
