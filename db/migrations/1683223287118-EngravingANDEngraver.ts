import { MigrationInterface, QueryRunner } from 'typeorm';

export class EngravingANDEngraver1683223287118 implements MigrationInterface {
  name = 'EngravingANDEngraver1683223287118';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "engraving" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "paintings_engravings" ("paintingsId" integer NOT NULL, "engravingId" integer NOT NULL, PRIMARY KEY ("paintingsId", "engravingId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8bd36a8908c73b68dd0be121be" ON "paintings_engravings" ("paintingsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9b4271ed3ee2f2aac98f1f5a1b" ON "paintings_engravings" ("engravingId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_painters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_painters"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "painters"`,
    );
    await queryRunner.query(`DROP TABLE "painters"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_painters" RENAME TO "painters"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_painters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "birthPlace" varchar, "deathDate" datetime, "birthDate" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_painters"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "painters"`,
    );
    await queryRunner.query(`DROP TABLE "painters"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_painters" RENAME TO "painters"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_painters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "birthPlace" varchar, "deathDate" datetime, "birthDate" datetime, "recordingType" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_painters"("id", "name", "created_at", "updated_at", "birthPlace", "deathDate", "birthDate") SELECT "id", "name", "created_at", "updated_at", "birthPlace", "deathDate", "birthDate" FROM "painters"`,
    );
    await queryRunner.query(`DROP TABLE "painters"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_painters" RENAME TO "painters"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_8bd36a8908c73b68dd0be121be"`);
    await queryRunner.query(`DROP INDEX "IDX_9b4271ed3ee2f2aac98f1f5a1b"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_paintings_engravings" ("paintingsId" integer NOT NULL, "engravingId" integer NOT NULL, CONSTRAINT "FK_8bd36a8908c73b68dd0be121be8" FOREIGN KEY ("paintingsId") REFERENCES "Paintings" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_9b4271ed3ee2f2aac98f1f5a1b3" FOREIGN KEY ("engravingId") REFERENCES "engraving" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("paintingsId", "engravingId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_paintings_engravings"("paintingsId", "engravingId") SELECT "paintingsId", "engravingId" FROM "paintings_engravings"`,
    );
    await queryRunner.query(`DROP TABLE "paintings_engravings"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_paintings_engravings" RENAME TO "paintings_engravings"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8bd36a8908c73b68dd0be121be" ON "paintings_engravings" ("paintingsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9b4271ed3ee2f2aac98f1f5a1b" ON "paintings_engravings" ("engravingId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_9b4271ed3ee2f2aac98f1f5a1b"`);
    await queryRunner.query(`DROP INDEX "IDX_8bd36a8908c73b68dd0be121be"`);
    await queryRunner.query(
      `ALTER TABLE "paintings_engravings" RENAME TO "temporary_paintings_engravings"`,
    );
    await queryRunner.query(
      `CREATE TABLE "paintings_engravings" ("paintingsId" integer NOT NULL, "engravingId" integer NOT NULL, PRIMARY KEY ("paintingsId", "engravingId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "paintings_engravings"("paintingsId", "engravingId") SELECT "paintingsId", "engravingId" FROM "temporary_paintings_engravings"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_paintings_engravings"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_9b4271ed3ee2f2aac98f1f5a1b" ON "paintings_engravings" ("engravingId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8bd36a8908c73b68dd0be121be" ON "paintings_engravings" ("paintingsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "painters" RENAME TO "temporary_painters"`,
    );
    await queryRunner.query(
      `CREATE TABLE "painters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "birthPlace" varchar, "deathDate" datetime, "birthDate" datetime)`,
    );
    await queryRunner.query(
      `INSERT INTO "painters"("id", "name", "created_at", "updated_at", "birthPlace", "deathDate", "birthDate") SELECT "id", "name", "created_at", "updated_at", "birthPlace", "deathDate", "birthDate" FROM "temporary_painters"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_painters"`);
    await queryRunner.query(
      `ALTER TABLE "painters" RENAME TO "temporary_painters"`,
    );
    await queryRunner.query(
      `CREATE TABLE "painters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "painters"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "temporary_painters"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_painters"`);
    await queryRunner.query(
      `ALTER TABLE "painters" RENAME TO "temporary_painters"`,
    );
    await queryRunner.query(
      `CREATE TABLE "painters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "birthPlace" varchar, "deathDate" datetime, "birthDate" datetime, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "painters"("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM "temporary_painters"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_painters"`);
    await queryRunner.query(`DROP INDEX "IDX_9b4271ed3ee2f2aac98f1f5a1b"`);
    await queryRunner.query(`DROP INDEX "IDX_8bd36a8908c73b68dd0be121be"`);
    await queryRunner.query(`DROP TABLE "paintings_engravings"`);
    await queryRunner.query(`DROP TABLE "engraving"`);
  }
}
