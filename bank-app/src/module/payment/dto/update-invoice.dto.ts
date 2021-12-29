import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoice } from './create-invoice.dto';

export class UpdateInvoiceDto extends PartialType(CreateInvoice) {}
