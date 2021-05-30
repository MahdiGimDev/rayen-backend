import {
  Controller,
  Get,
  Query,
  Delete,
  Body,
  Param,
  Patch,
  Put,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
  Post,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

import {
  MissionCreateDTO,
  MissionUpdateDTO,
  UserUpdateDto,
} from '../../models/user.dto';
import { MissionService } from '../services/mission.service';
import { MailerService } from '../services/mail.service';
import { MailingSendModel } from '../../shared/models/mailing.model';
import { environment } from '../../environments/environment';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { MissionStatus } from '../../models/role.mode';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Mission')
@Controller('missions')
export class MissionController {
  constructor(
    private readonly missionService: MissionService,
    private mailer: MailerService,
  ) {}

  @Get('mail')
  async testMail(@Param('id') id) {
    const mail: MailingSendModel = {
      from: environment.mailer,
      to: 'mahdi.hamrouni-flp@hotmail.com',
      subject: 'Mission Invitation',
      username: 'Testing',
    };
    try {
      this.mailer.sendMessage(mail, 'yeess');
    } catch (error) {
      console.log({ error: error.response });
    }
    return 'ok';
  }

  @Post('uploadplan/:id')
  @UseInterceptors(FileInterceptor('planfile'))
  async uploadPlanFile(@UploadedFile() file, @Param('id') id) {
    return await this.missionService.uploadPlanFile(file, id);
  }



  @Post('uploadbon/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileBon(@UploadedFile() file, @Param('id') id) {
    return await this.missionService.uploadbonfile(file, id);
  }

  @Post('uploaddevise/:id')
  @UseInterceptors(FileInterceptor('devise'))
  async uploadFiledevise(@UploadedFile() file, @Param('id') id) {
    return await this.missionService.uploadDevise(file, id);
  }
  @Post('uploadlogement/:id')
  @UseInterceptors(FileInterceptor('logement'))
  async uploadFileLogement(@UploadedFile() file, @Param('id') id) {
    return await this.missionService.uploadLogement(file, id);
  }
  @Post('uploadvisa/:id')
  @UseInterceptors(FileInterceptor('visa'))
  async uploadFileVisa(@UploadedFile() file, @Param('id') id) {
    return await this.missionService.uploadVisa(file, id);
  }
  @Post('uploadtransport/:id')
  @UseInterceptors(FileInterceptor('transport'))
  async uploadFileTransport(@UploadedFile() file, @Param('id') id) {
    return await this.missionService.uploadTransport(file, id);
  }

  @Put('save')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('planfile'))
  async createJob(
    @Req() req,
    @UploadedFile() planfile,
    @Body() model: MissionCreateDTO,
  ) {
    const currentUser = req.user;
    return await this.missionService.createMission(
      currentUser.id,
      model,
      planfile,
    );
  }

  @Get('all')
  async getAllMissions() {
    return await this.missionService.getAllMissionList();
  }
  @Get('client/:id')
  async getMissionsByClient(@Param('id') id) {
    return await this.missionService.getClientMissionList(id);
  }
  @Get('employee/:id')
  async getMissionByEmployee(@Param('id') id) {
    return await this.missionService.getEmployeeMissionList(id);
  }

  @Get('userc')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMissionByOwner(@Req() req) {
    const currentUser = req.user;
    return await this.missionService.getMissionsByUserc(currentUser.id);
  }

  @Get(':id')
  async getMissionById(@Param('id') id) {
    return await this.missionService.findById(id);
  }
  @ApiParam({ name: 'id', example: 1 })
  @Patch('accept/:id/:idUser')
  async assignUserToMission(@Param('id') id, @Param('idUser') idUser) {
    return await this.missionService.acceptMission(id, idUser);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Delete('refuses/:id/:idUser')
  async RefuseInvitationMission(@Param('id') id, @Param('idUser') idUser) {
    return await this.missionService.refuseInvitationMission(id, idUser);
  }
  @ApiParam({ name: 'id', example: 1 })
  @Delete('suggest/:id/:idUser')
  async removeUserToMission(@Param('id') id, @Param('idUser') idUser) {
    return await this.missionService.removeSuggestedUser(id, idUser);
  }


  @ApiParam({ name: 'id', example: 1 })
  @Patch('block/:id')
  async approveMission(@Param('id') id) {
    return await this.missionService.lockMission(id);
  }
  @ApiParam({ name: 'id', example: 1 })
  @Patch('confirm/:id')
  async confirmMission(@Param('id') id) {
    return await this.missionService.confirmMission(id);
  }
  @ApiParam({ name: 'id', example: 1 })
  @Patch('cancel/:id')
  async cancelMission(@Param('id') id) {
    return await this.missionService.cancelMission(id);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('cours/:id')
  async EnCoursMission(@Param('id') id) {
    return await this.missionService.MissionEnCours(id);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('available/:id')
  async freeMission(@Param('id') id) {
    return await this.missionService.freeMission(id);
  }

  @Patch('quiz/:idMission/:idQuiz')
  async assignQuizToMission(
    @Param('idMission') idMission,
    @Param('idQuiz') idQuiz,
  ) {
    return await this.missionService.assignQuizToMission(idMission, idQuiz);
  }

  @Delete('quiz/:idMission')
  async removeQuizFromJob(@Param('idMission') idMission) {
    return await this.missionService.removeQuizFromMission(idMission);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('suggest/:id/:idUser')
  async suggestUserToMission(@Param('id') id, @Param('idUser') idUser) {
    return await this.missionService.addSuggestedUser(id, idUser);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('update/:id')
  async updateProfile(@Param('id') id, @Body() model: MissionUpdateDTO) {
    return await this.missionService.editMission(id, model);
  }

  @Delete()
  async delete(@Query('id') id) {
    return await this.missionService.delete(id);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMyMissions(@Req() req) {
    return await this.missionService.getMissionsByUserc(req.user.id);
  }

  @Get('getstatus')
  @Roles(MissionStatus.CONFIRMED)
  async getMyProfile(@Req() req) {
    return await this.missionService.findById(req.mission.id);
  }

  @Get('status/:status')
  async getAllMissionByStatus(@Param('status') status) {
    if (!(status in MissionStatus)) {
      throw new HttpException('Status Undefined', HttpStatus.BAD_REQUEST);
    }
    return await this.missionService.getAllMissionByStatus(status);
  }
}
