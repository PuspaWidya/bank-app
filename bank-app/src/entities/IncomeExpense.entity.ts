import { IsOptional } from 'class-validator';
import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Validate,
} from 'sequelize-typescript';
import { Col } from 'sequelize/dist/lib/utils';
import { PaymentMethod } from 'src/common/enum';

import { v4 as uuid } from 'uuid';
import { User } from './user.entity';

@Table
export class IncomeExpense extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ allowNull: false })
  amount: number;

  @Column
  quantity: number;

  @Column
  unitPrice: number;

  @Column({ allowNull: false })
  paymentMethod: PaymentMethod;

  @Column({ allowNull: false })
  paymentReceiver: string;

  @Column({ allowNull: false })
  invoiceNumber: string;

  @Column
  userCode: string;

  @Column({ defaultValue: new Date() })
  transactionDate: Date;

  @Column
  note: string;

  @Column
  description: string;

  //siapa yang memasukan data tersebut
  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @BeforeCreate
  static generate(incomeExpense: IncomeExpense) {
    incomeExpense.id = uuid();
  }
}
