import { ObjectType, Field } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from '../../images/entities/Image.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Image, (image) => image.likes)
  @JoinColumn()
  image: Image;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
