import { User } from '../main/entities/user.entity';
import { MissionUpdateDTO, UserDto, UserUpdateDto } from '../models/user.dto';
import { compareSync } from 'bcrypt';
import { Mission } from '../main/entities/mission.entity';
import { Skills } from 'src/main/entities/skills.entity';

import { SkillsUpdateDTO } from '../models/skills.dto';
import { Certifs } from 'src/main/entities/certif.entity';
import { CertifsUpdateDTO } from 'src/models/certifs.dto';
export const toUserDto = (data: User): UserDto => {
  const { id, username, email } = data;
  const userDto: UserDto = { id, username, email };
  return userDto;
};

export const comparePwd = (password, encrypted) => {
  return compareSync(password, encrypted);
};

export const mergeUser = (user: User, update: UserUpdateDto) => {
  user.username =
    user.username != update.username ? update.username : user.username;
  user.firstName =
    user.firstName != update.firstName ? update.firstName : user.firstName;
  user.lastName =
    user.lastName != update.lastName ? update.lastName : user.lastName;
  return user;
};

export const mergeMission = (mission: Mission, update: MissionUpdateDTO) => {
  mission.description =
    mission.description != update.description
      ? update.description
      : mission.description;

  mission.title = mission.title != update.title ? update.title : mission.title;

  mission.address =
    mission.address != update.address ? update.address : mission.address;

  mission.period =
    mission.period != update.period ? update.period : mission.period;

  mission.technologies =
    mission.technologies != update.technologies
      ? update.technologies
      : mission.technologies;

  mission.startDate =
    mission.startDate != update.startDate
      ? update.startDate
      : mission.startDate;
  return mission;
};

export const mergeSkills = (skills: Skills, update: SkillsUpdateDTO) => {
  skills.label = skills.label != update.label ? update.label : skills.label;
  skills.description =
    skills.description != update.description
      ? update.description
      : skills.description;
  return skills;
};


export const mergeCertifs = (certifs: Certifs, update: CertifsUpdateDTO) => {
  certifs.label = certifs.label != update.label ? update.label : certifs.label;
  certifs.description =
  certifs.description != update.description
      ? update.description
      : certifs.description;
  return certifs;
};