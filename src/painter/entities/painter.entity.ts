import { Painting } from 'src/paintings/entities/painting.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'painters' })
export class Painter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  name: string;

  @Column({ nullable: true })
  birthPlace: string;

  @Column({ nullable: true })
  deathDate: Date;

  @Column({ nullable: true })
  birthDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationship
  @ManyToMany(() => Painting, (painting) => painting.painters)
  paintings: Painting[];
}
