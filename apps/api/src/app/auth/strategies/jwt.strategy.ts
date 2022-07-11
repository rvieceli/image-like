import { JwtTokenPayload } from '@image-like/shared-types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigurationService } from '../../configuration/configuration.service';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    configService: ConfigurationService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    } as StrategyOptions);
  }

  async validate(payload: JwtTokenPayload): Promise<User> {
    const { sub: id, email } = payload;
    const user = await this.usersService.getById(id);

    if (user.email !== email) {
      return;
    }

    return user;
  }
}
