import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1689874475589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "login" character varying NOT NULL UNIQUE,
        "password" character varying NOT NULL,
        "displayName" character varying,
        "about" character varying,
        "avatarUrl" character varying DEFAULT '/default.png'
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
