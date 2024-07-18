import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1721310551264 implements MigrationInterface {
    name = 'Initial1721310551264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "porducts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL, CONSTRAINT "PK_fb4c499709b87ef902b5dc1847e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "porducts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
