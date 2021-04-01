import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey
} from "typeorm";

export class createNotes1617150154479 implements MigrationInterface {
  private table = new Table({
    name: "notes",
    columns: [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "title",
        type: "varchar",
        length: '255',
        isNullable: false,
      },
      {
        name: "content",
        type: "varchar",
        length: '255',
        isUnique: true,
      },
      {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      },
      {
        name: "updated_at",
        type: "timestamp",
        default: "now()"
      }
    ]
  })

  private addColumnUserId = new TableColumn({
    name: "userId",
    type: "int",
    isNullable: false,
  })

  private tableForeignKey = new TableForeignKey({
    columnNames: ["userId"],
    referencedColumnNames: ["id"],
    referencedTableName: "users",
    onDelete: "CASCADE"
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.addColumn("notes", this.addColumnUserId)
    await queryRunner.createForeignKey("notes", this.tableForeignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
    await queryRunner.dropForeignKey("users", foreignKey!);
    await queryRunner.dropColumn("users", "userId");
    await queryRunner.dropTable("notes");
  }
}
