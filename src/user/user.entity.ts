import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  // Relationships

  @BeforeInsert()
  async hashPassword(): Promise<any> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<any> {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON(): any {
    return classToPlain(this);
  }
}
