import { MigrationInterface, QueryRunner } from 'typeorm';

export class BookANDEngravings1683246596918 implements MigrationInterface {
  name = 'BookANDEngravings1683246596918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "author" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_engraving" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "bookId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_engraving"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "engraving"`,
    );
    await queryRunner.query(`DROP TABLE "engraving"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_engraving" RENAME TO "engraving"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_engraving" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "bookId" integer, CONSTRAINT "FK_48121b87d81219c66761d3df336" FOREIGN KEY ("bookId") REFERENCES "book" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_engraving"("id", "name", "created_at", "updated_at", "bookId") SELECT "id", "name", "created_at", "updated_at", "bookId" FROM "engraving"`,
    );
    await queryRunner.query(`DROP TABLE "engraving"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_engraving" RENAME TO "engraving"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "engraving" RENAME TO "temporary_engraving"`,
    );
    await queryRunner.query(
      `CREATE TABLE "engraving" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "bookId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "engraving"("id", "name", "created_at", "updated_at", "bookId") SELECT "id", "name", "created_at", "updated_at", "bookId" FROM "temporary_engraving"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_engraving"`);
    await queryRunner.query(
      `ALTER TABLE "engraving" RENAME TO "temporary_engraving"`,
    );
    await queryRunner.query(
      `CREATE TABLE "engraving" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "engraving"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "temporary_engraving"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_engraving"`);
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
