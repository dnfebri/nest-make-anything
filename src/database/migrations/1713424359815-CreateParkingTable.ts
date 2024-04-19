import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateParkingTable1713424359815 implements MigrationInterface {
    name = 'CreateParkingTable1713424359815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."parking_type_enum" AS ENUM('car', 'motorcycle')`);
        await queryRunner.query(`CREATE TABLE "parking" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "time_in" TIMESTAMP NOT NULL, "time_out" TIMESTAMP, "price" integer NOT NULL, "type" "public"."parking_type_enum" NOT NULL DEFAULT 'motorcycle', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying DEFAULT 'System', "updated_at" TIMESTAMP DEFAULT now(), "updated_by" TIMESTAMP, CONSTRAINT "UQ_9472794f046f6f8156639e40373" UNIQUE ("code"), CONSTRAINT "PK_d611d86b1d39963d048b05976aa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "parking"`);
        await queryRunner.query(`DROP TYPE "public"."parking_type_enum"`);
    }

}
