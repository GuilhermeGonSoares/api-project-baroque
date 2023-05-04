import { Church } from 'src/church/entities/church.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

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

  @Column({ name: 'creation_year' })
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
  })
  church: Church;
}
