import { Module, HttpModule } from '@nestjs/common';
  import { PassportModule } from '@nestjs/passport';
  import { TypeOrmModule } from '@nestjs/typeorm';
import { CertifsController } from './controllers/certif.controller';
import { FormationController } from './controllers/formation.controller';
import { JobController } from './controllers/job.controller';
import { MissionController } from './controllers/mission.controller';
import { SkillsController } from './controllers/skills.controller';
import { UsersController } from './controllers/users.controller';
import { VacationController } from './controllers/vacation.controlller';
import { ExperienceController } from './controllers/experience.controller';
import { Document } from './entities/document.entity';
import { Certifs } from './entities/certif.entity';
import { Formation } from './entities/formation.entity';
import { Job } from './entities/jobsOffers.entity';
import { Mission } from './entities/mission.entity';
import { Proposition } from './entities/quiz/proposition.entity';
import { Question } from './entities/quiz/question.entity';
import { Quiz } from './entities/quiz/quiz.entity';

import { Skills } from './entities/skills.entity';
import { User } from './entities/user.entity';
import { Vacation } from './entities/vacation.entity';
import { CertifsRepository } from './repositories/certif.repository';
import { FormationRepository } from './repositories/formation.repository';
import { JobRepository } from './repositories/jobsOffers.repository';
import { MissionRepository } from './repositories/mission.repository';
import { SkillsRepository } from './repositories/skills.repository';
import { UserRepository } from './repositories/user.repository';
import { VacationRepository } from './repositories/vacation.repository';
import { CertifsService } from './services/certif.service';
import { ExperienceService } from './services/experience.service';
import { FormationService } from './services/formation.service';
import { JobService } from './services/jobsOffers.service';
import { MailerService } from './services/mail.service';
import { MissionService } from './services/mission.service';
import { SkillsService } from './services/skills.service';
import { UsersService } from './services/users.service';
import { VacationService } from './services/vacation.service';
import { ExperienceRepository } from './repositories/experience.repository';
import { Experience } from './entities/experience.entity';
import { DocumentRepository } from './repositories/document.repository';
import { DocumentService } from './services/document.service';
import { DocumentController } from './controllers/document.controller';
import { UploadService } from './services/upload.service';
import { QuizSession } from './entities/quiz/quizSession.entity';
import { QuizService } from './services/quiz/quiz.service';
import { QuizController } from './controllers/quiz.controller';
import { QuizRepository } from './repositories/quiz/quiz.repository';
import { QuestionRepository } from './repositories/quiz/question.repository';
import { PropositionRepository } from './repositories/quiz/proposition.repository';
import { QuizResponse } from './entities/quiz/quizResponse.entity';
import { QuizResponseRepository } from './repositories/quiz/quizResponse.repository';
import { QuizSessionRepository } from './repositories/quiz/quizSession.repository';
import { QuestionService } from './services/quiz/question.service';
import { Administrative } from './entities/administrative.entity';
import { AdministrativeRepository } from './repositories/administrative.repository';


import { Prospection } from './entities/prospection.entity';
import { ProspectionRepository } from './repositories/prospection.repository';
import { ProspectionService } from './services/prospection.service';
import { ProspectionController } from './controllers/prospection.controller';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      User,
      UserRepository,
      Mission,
      Vacation,
      Prospection,
      ProspectionRepository,
      VacationRepository,
      MissionRepository,
      AdministrativeRepository, 
      Skills,
      SkillsRepository,
      Certifs,
      CertifsRepository,
      Experience,
      ExperienceRepository,
      Job,
      JobRepository,
      Administrative,
      Formation,
      FormationRepository,
      Document,
      DocumentRepository,
      Quiz,
      QuizRepository,
      QuizSession,
      QuizSessionRepository,
      Question,
      QuestionRepository,
      Proposition,
      PropositionRepository,
      QuizResponse,
      QuizResponseRepository,
      DocumentRepository
    
     
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true,
    }),
  ],
  providers: [
    UsersService,
    MissionService,
    SkillsService,
    CertifsService, 
    JobService,
    UploadService,
    MailerService,
    VacationService,
    FormationService,
  
    ExperienceService,
    DocumentService,
    QuizService,
    QuestionService,
    ProspectionService
  ],
  controllers : [
    UsersController,

    FormationController,
    MissionController,
    SkillsController,
    JobController,
    VacationController,
    CertifsController,
    ExperienceController,
    DocumentController,
    QuizController,
    ProspectionController
  ],
  exports: [UsersService],
})
export class MainModule {}
