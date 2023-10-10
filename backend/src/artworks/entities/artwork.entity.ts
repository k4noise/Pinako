import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('artworks')
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  picture: string;

  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;
}
