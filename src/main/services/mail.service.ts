import { Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { loadTemplate } from '../../helpers/templateParser';
import {
  MailingSendModel,
  textStyle,
  btnStyle,
} from '../../shared/models/mailing.model';
import { Mission } from '../entities/mission.entity';
import { User } from '../entities/user.entity';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailerService {
  async sendMessage(model: MailingSendModel, html) {
    const { from, to, subject, username } = model;
    if (!html) html = loadTemplate(username);
    const msg = {
      to,
      from,
      subject,
      html,
    };
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const data = await sgMail.send(msg);
      return data;
    } catch (error) {
      console.log({ error: error.response.body.errors });
    }
    return false;
  }

  async newRegisterMail(user: User, password) {
    const link = `${environment.frontend}/auth`;
    let message = '';
    message += `<div>`;
    message += `<h3> Hello Mr <strong> ${user.firstName} </strong></h3>`;
    message += `<p ${textStyle}> Your account has been created successfully. </p>`;
    message += `<p ${textStyle}> Email : ${user.email} </p>`;
    message += `<p ${textStyle}> Password : ${password} </p>`;
    message += `<a ${btnStyle} href="${link}">Login</a>`;
    message += `</div>`;
    const mail: MailingSendModel = {
      from: environment.mailer,
      to: user.email,
      subject: 'Compte created',
      username: user.lastName + ' ' + user.firstName,
    };
    return await this.sendMessage(mail, message);
  }

  async acceptationMissionConfirmed(user: User, mission: Mission) {
    const link = `${environment.frontend}/pages/missions/detail/${mission.id}`;
    let message = '';
    message += `<div>`;
    message += `<h3>congratulations Your mission is confirmed <strong> ${mission.title} </strong></h3>`;
    message += `<p ${textStyle}> for further information click the button below. </p>`;
    message += `<a ${btnStyle} href="${link}">Mission Details</a>`;
    message += `</div>`;

    const mail: MailingSendModel = {
      from: environment.mailer,
      to: user.email,
      subject: 'Mission confirmed',
      username: user.lastName + ' ' + user.firstName,
    };
    return await this.sendMessage(mail, message);
  }

  async acceptMissionMail(user: User, mission: Mission) {
    const link = `${environment.frontend}/pages/missions/detail/${mission.id}`;
    let message = '';
    message += `<div>`;
    message += `<h3>Thanks for accepting the mission <strong> ${mission.title} </strong></h3>`;
    message += `<p ${textStyle}> Please wait for the mission to be confirmed </p>`;
    message += `<a ${btnStyle} href="${link}">Mission Details</a>`;
    message += `</div>`;

    const mail: MailingSendModel = {
      from: environment.mailer,
      to: user.email,
      subject: 'Mission Accepted',
      username: user.lastName + ' ' + user.firstName,
    };
    return await this.sendMessage(mail, message);
  }

  async sendSuggestMissionMail(user: User, mission: Mission) {
    const link = `${environment.frontend}/pages/missions/detail/${mission.id}`;
    let message = '';
    message += `<div>`;
    message += `<h3> You are Invited to the mission <strong> ${mission.title} </strong></h3>`;
    message += `<p ${textStyle}> for further information click the button below. </p>`;
    message += `<a ${btnStyle} href="${link}">Mission Details</a>`;
    message += `</div>`;

    const mail: MailingSendModel = {
      from: environment.mailer,
      to: user.email,
      subject: 'Mission Invitation',
      username: user.lastName + ' ' + user.firstName,
    };
    return await this.sendMessage(mail, message);
  }

  ///////////////////////////

  async sendSuggestMissionMailBlock(user: User, mission: Mission) {
    const link = `${environment.frontend}/pages/missions/detail/${mission.id}`;
    let message = '';
    message += `<div>`;
    message += `<h3> congratulations Status of mission is change to block because the client accepted your profil (Please block the date of mission) waiting for purchase order <strong> ${mission.title} </strong></h3>`;
    message += `<p ${textStyle}> for further information click the button below. </p>`;
    message += `<a ${btnStyle} href="${link}">Mission Details</a>`;
    message += `</div>`;

    const mail: MailingSendModel = {
      from: environment.mailer,
      to: user.email,
      subject: 'congratulations Mission date blocked',
      username: user.lastName + ' ' + user.firstName,
    };
    return await this.sendMessage(mail, message);
  }

  async sendResetMail(user: User) {
    const link = `${environment.frontend}/auth/reset-password?email=${user.email}&token=${user.resetPasswordToken}`;
    let message = '';
    message += `<div>`;
    message += `<h3> <strong>Reset your password?</strong></h3>`;
    message += `<p ${textStyle}>if you requested a password reset for ${user.email}, 
    click the button below. If you didn't make this request, ignore this email.</p>`;
    message += `<a ${btnStyle} href="${link}">Reset</a>`;
    message += `</div>`;
    const mail: MailingSendModel = {
      from: environment.mailer,
      to: user.email,
      subject: 'Password Reset',
      username: 'Flp-Administration',
    };
    return await this.sendMessage(mail, message);
  }

  async sendVerifyMail(user: User) {
    const link = `${environment.frontend}/auth/verify-account
    ?email=${user.email}
    &token=${user.verifyToken}`;
    let message = '';
    message += `<div>`;
    message += `<h3> <strong>Account Verification</strong></h3>`;
    message += `<p ${textStyle}> To Confirm your account ${user.email}, 
    click the button below. If you didn't make this request, ignore this email.</p>`;
    message += `<a ${btnStyle} href="${link}">Verify</a>`;
    message += `</div>`;
    const mail: MailingSendModel = {
      from: environment.mailer,
      to: user.email,
      subject: 'Account Verification',
      username: user.username,
    };
    return await this.sendMessage(mail, message);
  }
}
