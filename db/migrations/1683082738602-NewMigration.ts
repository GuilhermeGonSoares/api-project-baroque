import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1683082738602 implements MigrationInterface {
  name = 'NewMigration1683082738602';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Paintings"`);
  }
}
