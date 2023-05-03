import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaintingWithoutRelations1683156336757
  implements MigrationInterface
{
  name = 'CreatePaintingWithoutRelations1683156336757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "intertext" varchar(255), "image" varchar NOT NULL, "theme" varchar, "creation_year" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_Paintings"("id", "name") SELECT "id", "name" FROM "Paintings"`,
    );
    await queryRunner.query(`DROP TABLE "Paintings"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_Paintings" RENAME TO "Paintings"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Paintings" RENAME TO "temporary_Paintings"`,
    );
    await queryRunner.query(
      `CREATE TABLE "Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "Paintings"("id", "name") SELECT "id", "name" FROM "temporary_Paintings"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_Paintings"`);
  }
}
