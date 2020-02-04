import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { HasuraService } from './hasura/hasura.service';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [ConfigModule.forRoot(), HttpModule, AuthModule],
  controllers: [AppController, AuthController], 
  providers: [AppService, HasuraService, UsersService],
})
export class AppModule {}
