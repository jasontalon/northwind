import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { HasuraService } from './hasura/hasura.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, HasuraService],
})
export class AppModule {}
