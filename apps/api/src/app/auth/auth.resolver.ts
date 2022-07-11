import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginInput } from './inputs/login.input';
import { RegisterInput } from './inputs/register.input';
import { UserAuth } from './models/user-auth.model';

@Resolver(() => UserAuth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@Context('req') request: Request) {
    return request.user;
  }

  @Mutation(() => UserAuth)
  async register(@Args('data') data: RegisterInput) {
    const user = await this.authService.register(data);
    const token = await this.authService.getToken(user);

    return {
      user,
      token,
    };
  }

  @Mutation(() => UserAuth)
  async login(@Args('data') { email, password }: LoginInput) {
    const user = await this.authService.validateUser(email, password);
    const token = await this.authService.getToken(user);

    return {
      user,
      token,
    };
  }
}
