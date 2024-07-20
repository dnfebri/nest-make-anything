import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEntity1720063074740 implements MigrationInterface {
  name = 'InitEntity1720063074740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reward" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "imgs" json, "slug" character varying NOT NULL, "price" integer NOT NULL, "description" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "category_id" integer NOT NULL, CONSTRAINT "UQ_282fcda19c2edf41beab6e4074a" UNIQUE ("slug"), CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reward_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cec2456ff6961e24cab882c95bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying DEFAULT 'System', "updated_at" TIMESTAMP DEFAULT now(), "updated_by" TIMESTAMP, "deleted_at" TIMESTAMP, "deleted_by" character varying, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."parking_type_enum" AS ENUM('car', 'motorcycle')`,
    );
    await queryRunner.query(
      `CREATE TABLE "parking" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "time_in" TIMESTAMP NOT NULL, "time_out" TIMESTAMP, "price" integer NOT NULL, "type" "public"."parking_type_enum" NOT NULL DEFAULT 'motorcycle', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying DEFAULT 'System', "updated_at" TIMESTAMP DEFAULT now(), "updated_by" TIMESTAMP, CONSTRAINT "UQ_9472794f046f6f8156639e40373" UNIQUE ("code"), CONSTRAINT "PK_d611d86b1d39963d048b05976aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reward" ADD CONSTRAINT "FK_cec2456ff6961e24cab882c95bc" FOREIGN KEY ("category_id") REFERENCES "reward_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reward" DROP CONSTRAINT "FK_cec2456ff6961e24cab882c95bc"`,
    );
    await queryRunner.query(`DROP TABLE "parking"`);
    await queryRunner.query(`DROP TYPE "public"."parking_type_enum"`);
    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(`DROP TABLE "reward_category"`);
    await queryRunner.query(`DROP TABLE "reward"`);
  }
}
