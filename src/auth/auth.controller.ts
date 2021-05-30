import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
  Query,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserModel,
  RegistrationStatus,
  LoginResponseModel,
  ResetPasswordModel,
  VerificationModel,
  CreateUserDto,
} from './auth.models';
import { ApiTags, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { MailingSendModel } from '../shared/models/mailing.model';
import { AuthGuard } from '@nestjs/passport';
import { environment } from '../environments/environment';
import { UsersService } from '../main/services/users.service';
import { FilesInterceptor } from '@nestjs/platform-express';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Success',
    type: LoginResponseModel,
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserModel): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  @UseInterceptors(FilesInterceptor('files[]'))
  public async register(
    @UploadedFiles() files,
    @Body() model: CreateUserDto,
  ): Promise<RegistrationStatus> {
    if (model.password !== model.confirmPassword) {
      throw new HttpException("password don't match", HttpStatus.BAD_REQUEST);
    }
    const image = files[0];
    const resume = files[1];
    return await this.authService.register(model, image, resume);
  }

  @ApiQuery({ name: 'email' })
  @Get('forgot')
  public async forgotPassword(@Query('email') email): Promise<any> {
    const updatedUser = await this.authService.resetPasswordRequest(email);
    return { status: !!updatedUser.resetPasswordToken };
  }

  @ApiQuery({ name: 'email' })
  @Get('verify')
  public async sendVerification(@Query('email') email): Promise<any> {
    const updatedUser = await this.authService.verificationRequest(email);
    return { verificationToken: updatedUser.verifyToken };
  }

  @ApiBody({ type: ResetPasswordModel })
  @Post('resetPassword')
  public async resetPassword(@Body() model: ResetPasswordModel): Promise<any> {
    const updatedUser = await this.authService.resetPassword(model);
    return { status: !updatedUser.resetPasswordToken };
  }

  @ApiBody({ type: VerificationModel })
  @Post('verify')
  public async verify(@Body() model: VerificationModel): Promise<any> {
    const updatedUser = await this.authService.verifyAccount(model);
    return { status: updatedUser.verified };
  }

  @ApiBody({
    type: MailingSendModel,
  })
  @Post('mailing')
  public async test(@Body() model: MailingSendModel): Promise<any> {
    // return await this.mailer.sendMessage(model, null);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) res.redirect(`${environment.frontend}/auth/google-auth/${jwt}`);
    else res.redirect(`${environment.frontend}/login/failure`);
  }
}
