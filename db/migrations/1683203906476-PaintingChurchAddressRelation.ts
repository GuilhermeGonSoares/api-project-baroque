import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaintingChurchAddressRelation1683203906476
  implements MigrationInterface
{
  name = 'PaintingChurchAddressRelation1683203906476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "adresses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "cep" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "churches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "image" varchar NOT NULL, "addressId" integer, CONSTRAINT "REL_f7ab48a4b8b0d07fbe6dfffb4c" UNIQUE ("addressId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "intertext" varchar(255), "image" varchar NOT NULL, "theme" varchar, "creation_year" datetime NOT NULL, "isPublished" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "churchId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_Paintings"("id", "name") SELECT "id", "name" FROM "Paintings"`,
    );
    await queryRunner.query(`DROP TABLE "Paintings"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_Paintings" RENAME TO "Paintings"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "intertext" varchar(255), "image" varchar NOT NULL, "theme" varchar, "creation_year" datetime NOT NULL, "isPublished" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "churchId" integer, CONSTRAINT "FK_562440252406dc9fefe4aada16d" FOREIGN KEY ("churchId") REFERENCES "churches" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_Paintings"("id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId") SELECT "id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId" FROM "Paintings"`,
    );
    await queryRunner.query(`DROP TABLE "Paintings"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_Paintings" RENAME TO "Paintings"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_churches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "image" varchar NOT NULL, "addressId" integer, CONSTRAINT "REL_f7ab48a4b8b0d07fbe6dfffb4c" UNIQUE ("addressId"), CONSTRAINT "FK_f7ab48a4b8b0d07fbe6dfffb4c4" FOREIGN KEY ("addressId") REFERENCES "adresses" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_churches"("id", "name", "image", "addressId") SELECT "id", "name", "image", "addressId" FROM "churches"`,
    );
    await queryRunner.query(`DROP TABLE "churches"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_churches" RENAME TO "churches"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "churches" RENAME TO "temporary_churches"`,
    );
    await queryRunner.query(
      `CREATE TABLE "churches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "image" varchar NOT NULL, "addressId" integer, CONSTRAINT "REL_f7ab48a4b8b0d07fbe6dfffb4c" UNIQUE ("addressId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "churches"("id", "name", "image", "addressId") SELECT "id", "name", "image", "addressId" FROM "temporary_churches"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_churches"`);
    await queryRunner.query(
      `ALTER TABLE "Paintings" RENAME TO "temporary_Paintings"`,
    );
    await queryRunner.query(
      `CREATE TABLE "Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "intertext" varchar(255), "image" varchar NOT NULL, "theme" varchar, "creation_year" datetime NOT NULL, "isPublished" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "churchId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "Paintings"("id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId") SELECT "id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId" FROM "temporary_Paintings"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_Paintings"`);
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
    await queryRunner.query(`DROP TABLE "churches"`);
    await queryRunner.query(`DROP TABLE "adresses"`);
  }
}
