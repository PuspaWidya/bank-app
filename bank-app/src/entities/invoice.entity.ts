import {
  Table,
  Model,
  Column,
  PrimaryKey,
  BeforeCreate,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { TypeFee } from 'src/common/enum';
import { v4 as uuid } from 'uuid';
import { IncomeExpense } from './IncomeExpense.entity';
import { User } from './user.entity';

//mengatur balance invoice
@Table
export default class Invoice extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  type: TypeFee;

  @Column
  totalBalance: number;

  @Column
  invoiceNumber: string;

  @Column({ defaultValue: new Date() })
  invoiceDate: Date;

  @Column
  dueDate: Date;

  @Column
  note: string;

  //balance akan selalu di ambil dari sini, income juga agak masuk ke sini
  @Column
  balance: number;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => IncomeExpense, { foreignKey: 'invoiceNumber' })
  invoice: IncomeExpense;

  @BeforeCreate
  static generate(invoice: Invoice) {
    invoice.id = uuid();
  }
}
