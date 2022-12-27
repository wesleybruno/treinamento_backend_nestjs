import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { environment } from './../enviroment';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,  
    JwtModule.register({
      secret: environment.authSecret,
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule {}

