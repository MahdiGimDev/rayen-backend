import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from './main/services/users.service';

@Injectable()
export class TasksService {
  constructor(private userService: UsersService) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  handleCron() {
    this.userService.updateUserVacations();
    this.logger.debug('Updating vacations for all users 1 month');
  }

  /* @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  handleCron() {
    this.userService.updateUserVacations();
    this.logger.debug('Updating vacations for all users 1 month');
  }
*/

  @Cron(CronExpression.EVERY_6_MONTHS)
  handleMonthsCron() {
    this.userService.updateUser6MonthVacations();
    this.logger.debug('Updating vacations for all users 6 months');
  }
}
