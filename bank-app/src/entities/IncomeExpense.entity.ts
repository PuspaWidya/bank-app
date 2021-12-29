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

import { PaymentMethod, TypeFee } from 'src/common/enum';

import { v4 as uuid } from 'uuid';
import Invoice from './invoice.entity';
import { User } from './user.entity';

//log
@Table
export class IncomeExpense extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ allowNull: false })
  amount: number;

  @Column
  type: TypeFee;

  @Column
  quantity: number;

  @Column
  unitPrice: number;

  @Column({ allowNull: false })
  paymentMethod: PaymentMethod;

  @Column({ allowNull: false })
  paymentReceiver: string;

  // @Column({ allowNull: false })
  // invoiceNumber: string;

  @Column
  userCode: string;

  @Column({ defaultValue: new Date() })
  transactionDate: Date;

  @Column
  note: string;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Invoice, { foreignKey: 'invoiceNumber' })
  invoice: Invoice;

  @ForeignKey(() => Invoice)
  @Column
  invoiceNumber: string;

  @BeforeCreate
  static generate(incomeExpense: IncomeExpense) {
    incomeExpense.id = uuid();
  }
}
