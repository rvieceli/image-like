import { JwtTokenPayload } from '@image-like/shared-types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigurationService } from '../configuration/configuration.service';
import { PostgresErrorCodes } from '../database/postgres-error-codes.enum';
import { UsersService } from '../users/users.service';
import { JwtTokensWithUser } from './dtos/jwt-tokens-with-user.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigurationService
  ) {}

  async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    try {
      const newUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCodes.UniqueValidation) {
        throw new HttpException(
          'User already exists with this email',
          HttpStatus.BAD_REQUEST
        );
      }
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<Express.User | undefined> {
    try {
      const user = await this.usersService.getByEmail(email);

      await this.verifyPassword(password, user.password);

      // user.password = undefined;

      return user;
    } catch (error) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyPassword(incomingPassword: string, hashedUserPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      incomingPassword,
      hashedUserPassword
    );

    if (!isPasswordMatching) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async getToken(user: Express.User): Promise<string> {
    const payload: JwtTokenPayload = {
      email: user.email,
      sub: user.id,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
    });
  }

  async login(user: Express.User): Promise<JwtTokensWithUser> {
    const accessToken = await this.getToken(user);

    return {
      accessToken,
      user,
    };
  }
}
