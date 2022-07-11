import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Like } from '../../likes/entities/like.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Like, (like) => like.user)
  likes?: Like[];
}
