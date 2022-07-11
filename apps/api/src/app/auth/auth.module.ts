import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from '../configuration/configuration.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    ConfigurationModule,
    PassportModule,
    JwtModule.register({}),
    UsersModule,
  ],
  providers: [
    AuthService,
    // UsersService,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
  ],
  exports: [AuthService],
})
export class AuthModule {}
