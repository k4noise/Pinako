import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddArtworks1694972774843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artworks" (
        "id" SERIAL NOT NULL,
        "picture" character varying NOT NULL,
        "author" integer NOT NULL,
        "title" character varying NOT NULL,
        "description" character varying NOT NULL,
        "views" integer DEFAULT 0,
        "likes" integer DEFAULT 0
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "artworks" INTEGER[]  DEFAULT '{}';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "artworks"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "artworks";`);
  }
}
