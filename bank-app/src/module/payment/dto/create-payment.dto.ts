import { PaymentMethod, TypeFee } from 'src/common/enum';

export class CreatePaymentDto {
  amount: number;
  quantity: number;
  unitPrice: number;
  paymentMethod: PaymentMethod;
  paymentReceiver: string;
  invoiceNumber: string;
  description: string;
  note?: string;
  type: TypeFee;
}
