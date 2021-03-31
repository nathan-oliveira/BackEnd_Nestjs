import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import User from '../models/database/user.entity';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {}
}

export default RepoService;
