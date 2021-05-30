import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import { TasksService } from './task.service';

const options: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3307,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  synchronize: true,
  autoLoadEntities: true,
};
@Module({
  imports: [
    MainModule,
    AuthModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(options),
    ConfigModule.forRoot(),
  
  ],
  controllers: [AppController],
  providers: [AppService,TasksService],
})
export class AppModule {}
