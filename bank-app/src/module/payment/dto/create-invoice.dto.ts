import { TypeFee } from 'src/common/enum';

export class CreateInvoice {
  type: TypeFee;
  invoiceNumber: string;
  invoiceDate?: Date;
  dueDate: Date;
  note: string;
  balance: string;
}
