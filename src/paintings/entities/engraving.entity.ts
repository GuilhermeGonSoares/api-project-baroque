import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Painting } from './painting.entity';
import { Engraver } from 'src/painter/entities/engraver.entity';

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
}
