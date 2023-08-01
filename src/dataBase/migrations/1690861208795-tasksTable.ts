import { MigrationInterface, QueryRunner } from "typeorm";

export class tasksTable1690861208795 implements MigrationInterface {
    name = 'tasksTable1690861208795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lista_recados"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lista_recados"."tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "description" character varying NOT NULL, "archived" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lista_recados"."tasks" ADD CONSTRAINT "FK_8d12ff38fcc62aaba2cab748772" FOREIGN KEY ("id") REFERENCES "lista_recados"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lista_recados"."tasks" DROP CONSTRAINT "FK_8d12ff38fcc62aaba2cab748772"`);
        await queryRunner.query(`DROP TABLE "lista_recados"."tasks"`);
        await queryRunner.query(`DROP TABLE "lista_recados"."users"`);
    }

}
