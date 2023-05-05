import { MigrationInterface, QueryRunner } from "typeorm";

export class Engraverrelation1683223967778 implements MigrationInterface {
    name = 'Engraverrelation1683223967778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "engraving_engravers_engravers" ("engravingId" integer NOT NULL, "engraversId" integer NOT NULL, PRIMARY KEY ("engravingId", "engraversId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4b748243a5d5c468664a0ed067" ON "engraving_engravers_engravers" ("engravingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_46eedd82499eb96cd71d3c57ec" ON "engraving_engravers_engravers" ("engraversId") `);
        await queryRunner.query(`DROP INDEX "IDX_4b748243a5d5c468664a0ed067"`);
        await queryRunner.query(`DROP INDEX "IDX_46eedd82499eb96cd71d3c57ec"`);
        await queryRunner.query(`CREATE TABLE "temporary_engraving_engravers_engravers" ("engravingId" integer NOT NULL, "engraversId" integer NOT NULL, CONSTRAINT "FK_4b748243a5d5c468664a0ed067d" FOREIGN KEY ("engravingId") REFERENCES "engraving" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_46eedd82499eb96cd71d3c57ec6" FOREIGN KEY ("engraversId") REFERENCES "engravers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("engravingId", "engraversId"))`);
        await queryRunner.query(`INSERT INTO "temporary_engraving_engravers_engravers"("engravingId", "engraversId") SELECT "engravingId", "engraversId" FROM "engraving_engravers_engravers"`);
        await queryRunner.query(`DROP TABLE "engraving_engravers_engravers"`);
        await queryRunner.query(`ALTER TABLE "temporary_engraving_engravers_engravers" RENAME TO "engraving_engravers_engravers"`);
        await queryRunner.query(`CREATE INDEX "IDX_4b748243a5d5c468664a0ed067" ON "engraving_engravers_engravers" ("engravingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_46eedd82499eb96cd71d3c57ec" ON "engraving_engravers_engravers" ("engraversId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_46eedd82499eb96cd71d3c57ec"`);
        await queryRunner.query(`DROP INDEX "IDX_4b748243a5d5c468664a0ed067"`);
        await queryRunner.query(`ALTER TABLE "engraving_engravers_engravers" RENAME TO "temporary_engraving_engravers_engravers"`);
        await queryRunner.query(`CREATE TABLE "engraving_engravers_engravers" ("engravingId" integer NOT NULL, "engraversId" integer NOT NULL, PRIMARY KEY ("engravingId", "engraversId"))`);
        await queryRunner.query(`INSERT INTO "engraving_engravers_engravers"("engravingId", "engraversId") SELECT "engravingId", "engraversId" FROM "temporary_engraving_engravers_engravers"`);
        await queryRunner.query(`DROP TABLE "temporary_engraving_engravers_engravers"`);
        await queryRunner.query(`CREATE INDEX "IDX_46eedd82499eb96cd71d3c57ec" ON "engraving_engravers_engravers" ("engraversId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4b748243a5d5c468664a0ed067" ON "engraving_engravers_engravers" ("engravingId") `);
        await queryRunner.query(`DROP INDEX "IDX_46eedd82499eb96cd71d3c57ec"`);
        await queryRunner.query(`DROP INDEX "IDX_4b748243a5d5c468664a0ed067"`);
        await queryRunner.query(`DROP TABLE "engraving_engravers_engravers"`);
    }

}
