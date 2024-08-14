import { MigrationInterface, QueryRunner } from "typeorm";

export class A1722977811948 implements MigrationInterface {
    name = 'A1722977811948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" numeric NOT NULL, "imgUrl" character varying NOT NULL DEFAULT '../../assets/sinStock.png', "category_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "order_id" uuid, CONSTRAINT "REL_76d98794a8c9305943ad307b79" UNIQUE ("order_id"), CONSTRAINT "PK_11d407f307ebf19af9702464e22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "user_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "name" character varying(50) NOT NULL, "password" character varying NOT NULL, "address" text NOT NULL, "phone" integer NOT NULL, "country" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_orderDetails" ("product_id" uuid NOT NULL, "orderDetails_id" uuid NOT NULL, CONSTRAINT "PK_f46757bc208c357bdce7901a455" PRIMARY KEY ("product_id", "orderDetails_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_75dd7763f23bdef63efad6ba16" ON "products_orderDetails" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_52f2f80b8f502514d15cf751cb" ON "products_orderDetails" ("orderDetails_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderDetails" ADD CONSTRAINT "FK_76d98794a8c9305943ad307b797" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_orderDetails" ADD CONSTRAINT "FK_75dd7763f23bdef63efad6ba164" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_orderDetails" ADD CONSTRAINT "FK_52f2f80b8f502514d15cf751cba" FOREIGN KEY ("orderDetails_id") REFERENCES "orderDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_orderDetails" DROP CONSTRAINT "FK_52f2f80b8f502514d15cf751cba"`);
        await queryRunner.query(`ALTER TABLE "products_orderDetails" DROP CONSTRAINT "FK_75dd7763f23bdef63efad6ba164"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "orderDetails" DROP CONSTRAINT "FK_76d98794a8c9305943ad307b797"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_52f2f80b8f502514d15cf751cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_75dd7763f23bdef63efad6ba16"`);
        await queryRunner.query(`DROP TABLE "products_orderDetails"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orderDetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
