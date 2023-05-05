import { Church } from 'src/church/entities/church.entity';
import { Painter } from 'src/painter/entities/painter.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Engraving } from './engraving.entity';

@Entity({ name: 'Paintings' })
export class Painting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  intertext: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: true })
  theme: string;

  @Column({ name: 'creation_year', nullable: true })
  creationYear: Date;

  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationship
  @ManyToOne(() => Church, (church) => church.paintings, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  church: Church;

  @ManyToMany(() => Tag, (tag) => tag.paintings)
  @JoinTable({ name: 'paintings_tags' })
  tags: Tag[];

  @ManyToMany(() => Painter, (painter) => painter.paintings)
  @JoinTable({ name: 'paintings_painters' })
  painters: Painter[];

  @ManyToMany(() => Engraving)
  @JoinTable({ name: 'paintings_engravings' })
  engravings: Engraving[];
}
