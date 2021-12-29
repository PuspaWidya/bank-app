import {
  Table,
  Model,
  Column,
  PrimaryKey,
  BeforeCreate,
} from 'sequelize-typescript';
import { TypeFee } from 'src/common/enum';
import { v4 as uuid } from 'uuid';

//mengatur balance invoice
@Table
export default class Invoice extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  userId: string;

  @Column
  type: TypeFee;

  //hasil yang akan terus berkurang
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

  @BeforeCreate
  static generate(invoice: Invoice) {
    invoice.id = uuid();
  }
}
