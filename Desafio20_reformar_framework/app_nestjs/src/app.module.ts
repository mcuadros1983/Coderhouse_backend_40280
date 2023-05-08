import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { MessagesModule } from './messages/messages.module';
import { RandomModule } from './random/random.module';
import { SystemModule } from './system/system.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    AuthModule, 
    ProductsModule, 
    MessagesModule, 
    RandomModule, 
    SystemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
