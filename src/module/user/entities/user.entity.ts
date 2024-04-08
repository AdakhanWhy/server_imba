import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly username: string;

  @Column()
  readonly email: string;

  @Column()
  readonly password: string;

  @Column({ default: null })
  readonly drinks: string;
}
