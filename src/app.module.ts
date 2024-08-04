import { Module } from '@nestjs/common';
import { UserModule } from './lib/User/infrastructure/Nestjs/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
