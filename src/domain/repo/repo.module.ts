import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';

import User from '../models/database/user.entity';
import Note from '../models/database/notes.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Note
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
