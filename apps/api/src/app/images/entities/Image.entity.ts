import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Like } from '../../likes/entities/like.entity';

@ObjectType()
@Entity()
export class Image {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field(() => Number)
  @Column({ type: 'int' })
  width: number;

  @Field(() => Number)
  @Column({ type: 'int' })
  height: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => String)
  @Column()
  author: string; //user.name

  @Field(() => String)
  @Column()
  url: string; //urls.regular

  @Field(() => String)
  @Column()
  link: string; //links.html

  @OneToMany(() => Like, (like) => like.image)
  likes?: Like[];

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', default: 0 })
  likesCount: number;
}
