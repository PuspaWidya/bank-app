import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { IncomeExpense } from './entities/IncomeExpense.entity';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import Invoice from './entities/logPayment.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './module/auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.DATEBASE_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Invoice, IncomeExpense],
      synchronize: true,
      autoLoadModels: true,
    }),
    JwtModule.register({}),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
