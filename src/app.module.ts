import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMconfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot(typeORMconfig),
    AuthModule
  ],
})
export class AppModule { }
