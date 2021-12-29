import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreateInvoice } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Public } from 'src/common/public.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  //create invoice
  @Post('invoice')
  create(@Body() createInvoiceDto: CreateInvoice, @Request() req) {
    return this.paymentService.create(createInvoiceDto, req.user);
  }

  //update invoice
  @Patch('invoice')
  update(@Body() updateInvoiceDto: UpdateInvoiceDto, @Request() req) {
    return this.paymentService.update(updateInvoiceDto, req.user);
  }

  //create income and expense
  @Post('incomeExpense')
  createPayment(@Body() createPaymentDto: CreatePaymentDto, @Request() req) {
    return this.paymentService.createPayment(createPaymentDto, req.user);
  }

  // //update income and expense that come ?

  //see invoices that are input by admin
  @Get('admin')
  findAll(@Request() req) {
    return this.paymentService.findAll(req.user);
  }

  //see detail invoice
  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  //delete invoice -> only super admin that can do it
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.paymentService.remove(id, req.user);
  }

  //get all invoice -> just super admin that can see it
  @Get('superadmin')
  getAllData(@Request() req) {
    return this.paymentService.getAllData(req.user);
  }
}
