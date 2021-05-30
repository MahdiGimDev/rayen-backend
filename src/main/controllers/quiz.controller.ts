import {
  Controller,
  Get,
  Query,
  Delete,
  Body,
  Param,
  Put,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UserLevels } from '../../models/role.mode';
import { QuestionService } from '../services/quiz/question.service';
import { QuizService } from '../services/quiz/quiz.service';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService,
  ) {}

  @Get('all')
  async getAllQuiz() {
    return await this.quizService.getAllQuiz();
  }

  @Get('skills')
  async getQuizByJob(
    @Query('skill') skill = '',
    @Query('level') level = UserLevels.JUNIOR,
  ) {
    const skills = skill.trim().split(',');
    return await this.quizService.getQuizBySkills(skills, level);
  }

  @Get(':id')
  async getQuizById(@Param('id') id) {
    return await this.quizService.getQuiz(id);
  }

  @Put('save')
  async createSkills(@Body() model) {
    return await this.quizService.createQuiz(model);
  }

  @Delete('proposition/:id')
  async deleteProposition(@Param('id') id) {
    return await this.questionService.deleteProposition(id);
  }

  @Delete('question/:id')
  async deleteQuestion(@Param('id') id) {
    return await this.questionService.deleteQuestion(id);
  }

  @ApiParam({ name: 'id', example: 1 })
  @Post('question/:id')
  async updateSkills(@Param('id') id, @Body() model) {
    return await this.quizService.addQuestions(id, model);
  }

  @Post('session/:id')
  @UseInterceptors(FileInterceptor('file'))
  async createSession(@UploadedFile('file') file, @Param('id') id, @Body() model) {
    console.log({ file, model });
    return await this.quizService.startQuizSession(id, model, file);
  }

  @Get('session/job/:id')
  @UseInterceptors(FileInterceptor('cv'))
  async getSessionByJob(@Param('id') id) {
    return await this.quizService.getSessionByJob(id);
  }

  @Get('session/mission/:id')
  async getSessionByMission(@Param('id') id) {
    return await this.quizService.getSessionByMission(id);
  }


  @Get('session/get/:id')
  async getSessionById(@Param('id') id) {
    return await this.quizService.getSessionById(id);
  }


  @Get('session/get')
  async getSessions() {
    return await this.quizService.getSessions();
  }

  @ApiParam({ name: 'id', example: 1 })
  @Get('session/:id')
  async getResponses(@Param('id') sessionID) {
    return await this.quizService.getResponsesBySession(sessionID);
  }
  @ApiParam({ name: 'id', example: 1 })
  @Get('question/:id')
  async getQuestion(@Param('id') questionID) {
    return await this.quizService.getQuestionById(questionID);
  }
  @ApiParam({ name: 'id', example: 1 })
  @Post('submit/:responseID')
  async submitResponse(@Param('responseID') responseID, @Body() model) {
    const { propositions } = model;
    return await this.quizService.submitResponse(responseID, propositions);
  }
}
