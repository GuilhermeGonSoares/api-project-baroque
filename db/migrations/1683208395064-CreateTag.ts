import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTag1683208395064 implements MigrationInterface {
  name = 'CreateTag1683208395064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "paintings_tags_tags" ("paintingsId" integer NOT NULL, "tagsId" integer NOT NULL, PRIMARY KEY ("paintingsId", "tagsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c2020e7afa6bc4f830f42589c2" ON "paintings_tags_tags" ("paintingsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1cddf8ef95936d530593692a50" ON "paintings_tags_tags" ("tagsId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_c2020e7afa6bc4f830f42589c2"`);
    await queryRunner.query(`DROP INDEX "IDX_1cddf8ef95936d530593692a50"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_paintings_tags_tags" ("paintingsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "FK_c2020e7afa6bc4f830f42589c21" FOREIGN KEY ("paintingsId") REFERENCES "Paintings" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_1cddf8ef95936d530593692a506" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("paintingsId", "tagsId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_paintings_tags_tags"("paintingsId", "tagsId") SELECT "paintingsId", "tagsId" FROM "paintings_tags_tags"`,
    );
    await queryRunner.query(`DROP TABLE "paintings_tags_tags"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_paintings_tags_tags" RENAME TO "paintings_tags_tags"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c2020e7afa6bc4f830f42589c2" ON "paintings_tags_tags" ("paintingsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1cddf8ef95936d530593692a50" ON "paintings_tags_tags" ("tagsId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_1cddf8ef95936d530593692a50"`);
    await queryRunner.query(`DROP INDEX "IDX_c2020e7afa6bc4f830f42589c2"`);
    await queryRunner.query(
      `ALTER TABLE "paintings_tags_tags" RENAME TO "temporary_paintings_tags_tags"`,
    );
    await queryRunner.query(
      `CREATE TABLE "paintings_tags_tags" ("paintingsId" integer NOT NULL, "tagsId" integer NOT NULL, PRIMARY KEY ("paintingsId", "tagsId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "paintings_tags_tags"("paintingsId", "tagsId") SELECT "paintingsId", "tagsId" FROM "temporary_paintings_tags_tags"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_paintings_tags_tags"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_1cddf8ef95936d530593692a50" ON "paintings_tags_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c2020e7afa6bc4f830f42589c2" ON "paintings_tags_tags" ("paintingsId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_1cddf8ef95936d530593692a50"`);
    await queryRunner.query(`DROP INDEX "IDX_c2020e7afa6bc4f830f42589c2"`);
    await queryRunner.query(`DROP TABLE "paintings_tags_tags"`);
    await queryRunner.query(`DROP TABLE "tags"`);
  }
}
