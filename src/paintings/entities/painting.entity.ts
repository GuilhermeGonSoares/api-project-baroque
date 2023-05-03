import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Paintings' })
export class Painting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  name: string;
}
