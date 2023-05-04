import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Painting } from 'src/paintings/entities/painting.entity';

@Entity({ name: 'churches' })
export class Church {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationship
  @OneToOne(() => Address, { onDelete: 'SET NULL' })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Painting, (painting) => painting.church)
  paintings: Painting[];
}
