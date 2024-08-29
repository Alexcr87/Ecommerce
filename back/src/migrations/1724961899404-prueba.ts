import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba1724961899404 implements MigrationInterface {
    name = 'Prueba1724961899404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imgUrl" SET DEFAULT 'https://res.cloudinary.com/dkuxl5rdo/image/upload/v1722894656/upload/sinStock.png.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imgUrl" SET DEFAULT '../../assets/sinStock.png'`);
    }

}
