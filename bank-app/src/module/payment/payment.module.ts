import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { IncomeExpense } from 'src/entities/IncomeExpense.entity';
import Invoice from 'src/entities/invoice.entity';

@Module({
  imports: [SequelizeModule.forFeature([IncomeExpense, Invoice])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
