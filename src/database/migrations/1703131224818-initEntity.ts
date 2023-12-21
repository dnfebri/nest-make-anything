import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEntity1703131224818 implements MigrationInterface {
  name = 'InitEntity1703131224818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reward_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cec2456ff6961e24cab882c95bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reward" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "imgs" json, "slug" character varying NOT NULL, "price" integer NOT NULL, "description" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "category_id" integer NOT NULL, CONSTRAINT "UQ_282fcda19c2edf41beab6e4074a" UNIQUE ("slug"), CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" ADD CONSTRAINT "FK_cec2456ff6961e24cab882c95bc" FOREIGN KEY ("category_id") REFERENCES "reward_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reward" DROP CONSTRAINT "FK_cec2456ff6961e24cab882c95bc"`,
    );
    await queryRunner.query(`DROP TABLE "reward"`);
    await queryRunner.query(`DROP TABLE "reward_category"`);
  }
}
