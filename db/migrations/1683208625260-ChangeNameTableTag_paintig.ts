import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNameTableTagPaintig1683208625260 implements MigrationInterface {
    name = 'ChangeNameTableTagPaintig1683208625260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paintings_tags" ("paintingsId" integer NOT NULL, "tagsId" integer NOT NULL, PRIMARY KEY ("paintingsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b46ad24d46fbc48de4b2598b9d" ON "paintings_tags" ("paintingsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf03300ab565ce09027e8938c5" ON "paintings_tags" ("tagsId") `);
        await queryRunner.query(`DROP INDEX "IDX_b46ad24d46fbc48de4b2598b9d"`);
        await queryRunner.query(`DROP INDEX "IDX_bf03300ab565ce09027e8938c5"`);
        await queryRunner.query(`CREATE TABLE "temporary_paintings_tags" ("paintingsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "FK_b46ad24d46fbc48de4b2598b9d1" FOREIGN KEY ("paintingsId") REFERENCES "Paintings" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_bf03300ab565ce09027e8938c58" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("paintingsId", "tagsId"))`);
        await queryRunner.query(`INSERT INTO "temporary_paintings_tags"("paintingsId", "tagsId") SELECT "paintingsId", "tagsId" FROM "paintings_tags"`);
        await queryRunner.query(`DROP TABLE "paintings_tags"`);
        await queryRunner.query(`ALTER TABLE "temporary_paintings_tags" RENAME TO "paintings_tags"`);
        await queryRunner.query(`CREATE INDEX "IDX_b46ad24d46fbc48de4b2598b9d" ON "paintings_tags" ("paintingsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf03300ab565ce09027e8938c5" ON "paintings_tags" ("tagsId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_bf03300ab565ce09027e8938c5"`);
        await queryRunner.query(`DROP INDEX "IDX_b46ad24d46fbc48de4b2598b9d"`);
        await queryRunner.query(`ALTER TABLE "paintings_tags" RENAME TO "temporary_paintings_tags"`);
        await queryRunner.query(`CREATE TABLE "paintings_tags" ("paintingsId" integer NOT NULL, "tagsId" integer NOT NULL, PRIMARY KEY ("paintingsId", "tagsId"))`);
        await queryRunner.query(`INSERT INTO "paintings_tags"("paintingsId", "tagsId") SELECT "paintingsId", "tagsId" FROM "temporary_paintings_tags"`);
        await queryRunner.query(`DROP TABLE "temporary_paintings_tags"`);
        await queryRunner.query(`CREATE INDEX "IDX_bf03300ab565ce09027e8938c5" ON "paintings_tags" ("tagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b46ad24d46fbc48de4b2598b9d" ON "paintings_tags" ("paintingsId") `);
        await queryRunner.query(`DROP INDEX "IDX_bf03300ab565ce09027e8938c5"`);
        await queryRunner.query(`DROP INDEX "IDX_b46ad24d46fbc48de4b2598b9d"`);
        await queryRunner.query(`DROP TABLE "paintings_tags"`);
    }

}
