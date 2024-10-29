import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../graphql';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  author: string;

  @Column({
    default: Status.NOT_STARTED,
    enum: [Status.NOT_STARTED, Status.IN_PROGRESS, Status.COMPLETED],
  })
  status: Status;

  @Column({ type: 'int', nullable: true })
  rating?: number;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
