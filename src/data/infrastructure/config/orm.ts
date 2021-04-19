import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserDAO, NoteDAO } from "src/domain/models"

const options: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "node_backend_acacia",
  synchronize: false,
  logging: false,
  entities: [
    UserDAO, NoteDAO
  ],
  migrations: [
    "./dist/data/infrastructure/database/migrations/*{.ts,.js}"
  ],
  cli: {
    "migrationsDir": "./dist/data/infrastructure/database/migrations"
  }
}

module.exports = options;
