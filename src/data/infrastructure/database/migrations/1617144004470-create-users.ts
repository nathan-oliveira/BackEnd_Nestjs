import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1617144004470 implements MigrationInterface {
  private table = new Table({
    name: "users",
    columns: [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment"
      },
      {
        name: "username",
        type: "varchar",
        length: '255',
      },
      {
        name: "email",
        type: "varchar",
        length: '255',
        isNullable: false,
        isUnique: true,
      },
      {
        name: "password",
        type: "varchar",
        length: '255',
        isNullable: false,
      },
      {
        name: "emailVerified",
        type: "boolean",
        default: false,
      },
      {
        name: "realm",
        type: "varchar",
        length: '255',
        isUnique: true,
      },
      {
        name: "created_at",
        type: "timestamp",
        default: "now()",
      },
      {
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      },
    ]
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

}
