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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { TypeProvider, UserRoles } from '../../models/role.mode';
import { Roles } from '../../auth/roles.decorator';
import { UserUpdateDto } from '../../models/user.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('all')
  async getAllUsers() {
    return await this.userService.getAllUserList();
  }

  @Get('get/:role')
  async getAllUsersByRole(@Param('role') role) {
    if (!(role in UserRoles)) {
      throw new HttpException('Role Undefined', HttpStatus.BAD_REQUEST);
    } 
    return await this.userService.getAllUserByRole(role);
  }
  @Get()
  async getUsers(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.userService.getAllUsers(page, limit);
  }

  @Get('skills/:id')
  async getUsersBySkills(@Param('id') id, @Query('skill') skill = '') {
    const skills = skill.trim().split(',');
    return await this.userService.getUsersBySkills(skills, id);
  }


  @Get('skillsuser/:id')
  async getSkillsByUser(@Param('id') id, @Query('skill') skill = '') {
    const skills = skill.trim().split(',');
    return await this.userService.getUsersBySkills(skills, id);
  }


  @Get('update/vacations')
  async updateVacations() {
    return await this.userService.updateUserVacations();
  }

  @Get('get')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.CLIENT)
  async getMyProfile(@Req() req) {
    return await this.userService.findById(req.user.id);
  }

  @Get('gettype')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TypeProvider.PHYSIQUE)
  async getMyProfileP(@Req() req) {
    return await this.userService.findById(req.user.id);
  }

  @Get('getE')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.EMPLOYEE)
  async getMyProfileE(@Req() req) {
    return await this.userService.findById(req.user.id);
  }

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file, @Param('id') id) {
    return await this.userService.uploadPhoto(file, id);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Param('id') id) {
    return await this.userService.uploadCv(file, id);
  }

  @Post('uploadcertif/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileCertif(@UploadedFile() file, @Param('id') id) {
    return await this.userService.uploadCertif(file, id);
  }

  @ApiParam({ name: 'id', example: 3 })
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('enable/:id')
  async enabledUser(@Param('id') id) {
    return await this.userService.enabledUser(id, true);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('disable/:id')
  async disableUser(@Param('id') id) {
    return await this.userService.enabledUser(id, false);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('update')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoles.CLIENT)
  async updateMyProfile(@Req() req, @Body() model: any) {
    const user = req.user;
    return await this.userService.updateProfile(user.id, model);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Patch('update/:id')
  async updateProfile(@Param('id') id, @Body() model: any) {
    return await this.userService.updateProfile(id, model);
  }

  @Delete()
  async deleteUser(@Query('id') id) {
    return await this.userService.delete(id);
  }

  @Get('name')
  async getUsersByName(
    @Query('username') username = '',
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return await this.userService.getUsersByUserName(username, page, limit);
  }
}
