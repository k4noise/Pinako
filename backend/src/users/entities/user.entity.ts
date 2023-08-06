import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column({ select: false })
  password: string;

  @Column()
  displayName: string;

  @Column()
  about: string;

  @Column()
  avatarUrl: string;
}
