
import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user.module';
import configuration from '@config/config.enviroment';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
