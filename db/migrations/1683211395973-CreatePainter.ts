import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePainter1683211395973 implements MigrationInterface {
    name = 'CreatePainter1683211395973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "painters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "birthPlace" varchar, "deathDate" datetime, "birthDate" datetime, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "paintings_painters" ("paintingsId" integer NOT NULL, "paintersId" integer NOT NULL, PRIMARY KEY ("paintingsId", "paintersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_10e2f0160cc39c4589e171691d" ON "paintings_painters" ("paintingsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f67bde636359d5aa8dcea3542c" ON "paintings_painters" ("paintersId") `);
        await queryRunner.query(`CREATE TABLE "temporary_Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "intertext" varchar(255), "image" varchar NOT NULL, "theme" varchar, "creation_year" datetime NOT NULL, "isPublished" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "churchId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_Paintings"("id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId") SELECT "id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId" FROM "Paintings"`);
        await queryRunner.query(`DROP TABLE "Paintings"`);
        await queryRunner.query(`ALTER TABLE "temporary_Paintings" RENAME TO "Paintings"`);
        await queryRunner.query(`CREATE TABLE "temporary_Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "intertext" varchar(255), "image" varchar NOT NULL, "theme" varchar, "creation_year" datetime, "isPublished" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "churchId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_Paintings"("id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId") SELECT "id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId" FROM "Paintings"`);
        await queryRunner.query(`DROP TABLE "Paintings"`);
        await queryRunner.query(`ALTER TABLE "temporary_Paintings" RENAME TO "Paintings"`);
        await queryRunner.query(`CREATE TABLE "temporary_Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "intertext" varchar(255), "image" varchar NOT NULL, "theme" varchar, "creation_year" datetime, "isPublished" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "churchId" integer NOT NULL, CONSTRAINT "FK_562440252406dc9fefe4aada16d" FOREIGN KEY ("churchId") REFERENCES "churches" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Paintings"("id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId") SELECT "id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId" FROM "Paintings"`);
        await queryRunner.query(`DROP TABLE "Paintings"`);
        await queryRunner.query(`ALTER TABLE "temporary_Paintings" RENAME TO "Paintings"`);
        await queryRunner.query(`DROP INDEX "IDX_10e2f0160cc39c4589e171691d"`);
        await queryRunner.query(`DROP INDEX "IDX_f67bde636359d5aa8dcea3542c"`);
        await queryRunner.query(`CREATE TABLE "temporary_paintings_painters" ("paintingsId" integer NOT NULL, "paintersId" integer NOT NULL, CONSTRAINT "FK_10e2f0160cc39c4589e171691db" FOREIGN KEY ("paintingsId") REFERENCES "Paintings" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_f67bde636359d5aa8dcea3542cb" FOREIGN KEY ("paintersId") REFERENCES "painters" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("paintingsId", "paintersId"))`);
        await queryRunner.query(`INSERT INTO "temporary_paintings_painters"("paintingsId", "paintersId") SELECT "paintingsId", "paintersId" FROM "paintings_painters"`);
        await queryRunner.query(`DROP TABLE "paintings_painters"`);
        await queryRunner.query(`ALTER TABLE "temporary_paintings_painters" RENAME TO "paintings_painters"`);
        await queryRunner.query(`CREATE INDEX "IDX_10e2f0160cc39c4589e171691d" ON "paintings_painters" ("paintingsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f67bde636359d5aa8dcea3542c" ON "paintings_painters" ("paintersId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_f67bde636359d5aa8dcea3542c"`);
        await queryRunner.query(`DROP INDEX "IDX_10e2f0160cc39c4589e171691d"`);
        await queryRunner.query(`ALTER TABLE "paintings_painters" RENAME TO "temporary_paintings_painters"`);
        await queryRunner.query(`CREATE TABLE "paintings_painters" ("paintingsId" integer NOT NULL, "paintersId" integer NOT NULL, PRIMARY KEY ("paintingsId", "paintersId"))`);
        await queryRunner.query(`INSERT INTO "paintings_painters"("paintingsId", "paintersId") SELECT "paintingsId", "paintersId" FROM "temporary_paintings_painters"`);
        await queryRunner.query(`DROP TABLE "temporary_paintings_painters"`);
        await queryRunner.query(`CREATE INDEX "IDX_f67bde636359d5aa8dcea3542c" ON "paintings_painters" ("paintersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_10e2f0160cc39c4589e171691d" ON "paintings_painters" ("paintingsId") `);
        await queryRunner.query(`ALTER TABLE "Paintings" RENAME TO "temporary_Paintings"`);
        await queryRunner.query(`CREATE TABLE "Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "intertext" varchar(255), "image" varchar NOT NULL, "theme" varchar, "creation_year" datetime, "isPublished" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "churchId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "Paintings"("id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId") SELECT "id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId" FROM "temporary_Paintings"`);
        await queryRunner.query(`DROP TABLE "temporary_Paintings"`);
        await queryRunner.query(`ALTER TABLE "Paintings" RENAME TO "temporary_Paintings"`);
        await queryRunner.query(`CREATE TABLE "Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "intertext" varchar(255), "image" varchar NOT NULL, "theme" varchar, "creation_year" datetime NOT NULL, "isPublished" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "churchId" integer)`);
        await queryRunner.query(`INSERT INTO "Paintings"("id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId") SELECT "id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId" FROM "temporary_Paintings"`);
        await queryRunner.query(`DROP TABLE "temporary_Paintings"`);
        await queryRunner.query(`ALTER TABLE "Paintings" RENAME TO "temporary_Paintings"`);
        await queryRunner.query(`CREATE TABLE "Paintings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "intertext" varchar(255), "image" varchar NOT NULL, "theme" varchar, "creation_year" datetime NOT NULL, "isPublished" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "churchId" integer, CONSTRAINT "FK_562440252406dc9fefe4aada16d" FOREIGN KEY ("churchId") REFERENCES "churches" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "Paintings"("id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId") SELECT "id", "name", "intertext", "image", "theme", "creation_year", "isPublished", "created_at", "updated_at", "churchId" FROM "temporary_Paintings"`);
        await queryRunner.query(`DROP TABLE "temporary_Paintings"`);
        await queryRunner.query(`DROP INDEX "IDX_f67bde636359d5aa8dcea3542c"`);
        await queryRunner.query(`DROP INDEX "IDX_10e2f0160cc39c4589e171691d"`);
        await queryRunner.query(`DROP TABLE "paintings_painters"`);
        await queryRunner.query(`DROP TABLE "painters"`);
    }

}
