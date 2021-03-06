import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import User from "src/domain/models/database/user.entity";
import Note from "src/domain/models/database/notes.entity";

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Note) public readonly noteRepo: Repository<Note>,
  ) {}
}

export default RepoService;
