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

  @Column({ nullable: true })
  about: string;

  @Column({ default: '/default.jpg' })
  avatarUrl: string;

  @Column({ select: false, nullable: true })
  refreshToken: string;
}
