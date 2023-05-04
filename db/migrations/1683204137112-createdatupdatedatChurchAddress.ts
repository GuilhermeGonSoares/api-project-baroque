import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedatupdatedatChurchAddress1683204137112 implements MigrationInterface {
    name = 'CreatedatupdatedatChurchAddress1683204137112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_adresses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "cep" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_adresses"("id", "city", "state", "cep") SELECT "id", "city", "state", "cep" FROM "adresses"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
        await queryRunner.query(`ALTER TABLE "temporary_adresses" RENAME TO "adresses"`);
        await queryRunner.query(`CREATE TABLE "temporary_churches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "image" varchar NOT NULL, "addressId" integer, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "REL_f7ab48a4b8b0d07fbe6dfffb4c" UNIQUE ("addressId"), CONSTRAINT "FK_f7ab48a4b8b0d07fbe6dfffb4c4" FOREIGN KEY ("addressId") REFERENCES "adresses" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_churches"("id", "name", "image", "addressId") SELECT "id", "name", "image", "addressId" FROM "churches"`);
        await queryRunner.query(`DROP TABLE "churches"`);
        await queryRunner.query(`ALTER TABLE "temporary_churches" RENAME TO "churches"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "churches" RENAME TO "temporary_churches"`);
        await queryRunner.query(`CREATE TABLE "churches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "image" varchar NOT NULL, "addressId" integer, CONSTRAINT "REL_f7ab48a4b8b0d07fbe6dfffb4c" UNIQUE ("addressId"), CONSTRAINT "FK_f7ab48a4b8b0d07fbe6dfffb4c4" FOREIGN KEY ("addressId") REFERENCES "adresses" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "churches"("id", "name", "image", "addressId") SELECT "id", "name", "image", "addressId" FROM "temporary_churches"`);
        await queryRunner.query(`DROP TABLE "temporary_churches"`);
        await queryRunner.query(`ALTER TABLE "adresses" RENAME TO "temporary_adresses"`);
        await queryRunner.query(`CREATE TABLE "adresses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "cep" varchar)`);
        await queryRunner.query(`INSERT INTO "adresses"("id", "city", "state", "cep") SELECT "id", "city", "state", "cep" FROM "temporary_adresses"`);
        await queryRunner.query(`DROP TABLE "temporary_adresses"`);
    }

}
