import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { User, UserSchema } from '../users/schemas/User';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: {
            expiresIn: '2days',
          },
          verifyOptions: {
            ignoreExpiration: false,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
