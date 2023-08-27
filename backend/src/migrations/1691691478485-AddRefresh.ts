import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefresh1691691478485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE users ADD refreshToken character varying',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users DROP COLUMN refreshToken');
  }
}
