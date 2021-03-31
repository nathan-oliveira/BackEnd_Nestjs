import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';

import User from '../models/database/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
