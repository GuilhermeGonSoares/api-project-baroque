import { MigrationInterface, QueryRunner } from "typeorm";

export class Engraver1683223868976 implements MigrationInterface {
    name = 'Engraver1683223868976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "engravers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "recordingType" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_painters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "birthPlace" varchar, "deathDate" datetime, "birthDate" datetime)`);
        await queryRunner.query(`INSERT INTO "temporary_painters"("id", "name", "created_at", "updated_at", "birthPlace", "deathDate", "birthDate") SELECT "id", "name", "created_at", "updated_at", "birthPlace", "deathDate", "birthDate" FROM "painters"`);
        await queryRunner.query(`DROP TABLE "painters"`);
        await queryRunner.query(`ALTER TABLE "temporary_painters" RENAME TO "painters"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "painters" RENAME TO "temporary_painters"`);
        await queryRunner.query(`CREATE TABLE "painters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "birthPlace" varchar, "deathDate" datetime, "birthDate" datetime, "recordingType" varchar)`);
        await queryRunner.query(`INSERT INTO "painters"("id", "name", "created_at", "updated_at", "birthPlace", "deathDate", "birthDate") SELECT "id", "name", "created_at", "updated_at", "birthPlace", "deathDate", "birthDate" FROM "temporary_painters"`);
        await queryRunner.query(`DROP TABLE "temporary_painters"`);
        await queryRunner.query(`DROP TABLE "engravers"`);
    }

}
