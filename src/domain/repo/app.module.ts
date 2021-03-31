import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from '../../presentation/controllers/app.controller';
import { UserController } from '../../presentation/controllers/user.controller';

import { AppService } from '../services/app.service'
import { UserService } from '../services/user.service'

import RepoModule from './repo.module';
import * as ormOptions from '../../data/infrastructure/config/orm'

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), RepoModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
