import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/guards/roles.guard";
import { FormationDTO } from "src/models/formation.dto";
import { FormationStatus1 } from "src/models/role.mode";
import { FormationService } from "../services/formation.service";

@ApiTags('Formations')
@Controller('formations')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Put('save')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createJob(@Req() req, @Body() model: FormationDTO) {
    return await this.formationService.createFormationRequest(req.user.id, model);
  }

  @Get('all')
  async getAllJobs() {
    return await this.formationService.getAllFormations();
  }

  @Get('status/:status')
  async getAllUsersByRole(@Param('status') status) {
    if (!(status in FormationStatus1)) {
      throw new HttpException('Status Undefined', HttpStatus.BAD_REQUEST);
    }
    return await this.formationService.getFormationsByStatus(status);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMyVacations(@Req() req) {
    return await this.formationService.getFormationsByUser(req.user.id);
  }

  @Get('me/:status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMyVacationsStatus(@Req() req, @Param('status') status) {
    if (!(status in FormationStatus1)) {
      throw new HttpException('Status Undefined', HttpStatus.BAD_REQUEST);
    }
    return await this.formationService.getVacationsByUserByStatus(req.user.id, status);
  }

  @Get('/user/:id')
  async getVacationsByUser(@Param('id') id) {
    return await this.formationService.getFormationsByUser(id);
  }

  @Get('get/:id')
  async getVacation(@Param('id') id) {
    return await this.formationService.getVacation(id);
  }

  @Patch('accept/:id')
  async acceptVacation(@Param('id') id) {
    return await this.formationService.changeVacationStatus(
      id,
      FormationStatus1.ACCEPTED,
    );
  }

  @Patch('refuse/:id')
  async refuseVacation(@Param('id') id) {
    return await this.formationService.changeVacationStatus(
      id,
      FormationStatus1.REFUSED,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.formationService.delete(id);
  }
}
