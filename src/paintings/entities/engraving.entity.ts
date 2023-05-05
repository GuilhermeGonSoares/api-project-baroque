import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Painting } from './painting.entity';
import { Engraver } from 'src/painter/entities/engraver.entity';
import { Book } from 'src/book/entities/book.entity';

@Entity()
export class Engraving {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationship
  @ManyToMany(() => Painting, (painting) => painting.engravings)
  paintings: Painting[];

  @ManyToMany(() => Engraver, (engraver) => engraver.engravings)
  @JoinTable()
  engravers: Engraver[];

  @ManyToOne(() => Book, (book) => book.engravings, { nullable: true })
  book: Book;
}
