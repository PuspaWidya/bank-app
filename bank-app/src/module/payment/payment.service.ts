import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { successConstant } from 'src/common/errorCode';
import { FilterException } from 'src/common/filterException';
import { IncomeExpense } from 'src/entities/IncomeExpense.entity';
import Invoice from 'src/entities/invoice.entity';
import { CreateInvoice } from './dto/create-invoice.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(IncomeExpense)
    private readonly incomeExpenseRepo: typeof IncomeExpense,
    @InjectModel(Invoice)
    private readonly invoiceRepository: typeof Invoice,
  ) {}

  async create(createInvoiceDto: CreateInvoice, payload) {
    const checkInvoice = await this.invoiceRepository.findOne({
      where: {
        invoiceNumber: createInvoiceDto.invoiceNumber,
      },
    });

    if (checkInvoice) {
      throw new FilterException({ message: 'invoice already exist' });
    }

    console.log({ payload });
    await this.invoiceRepository.create({
      userId: payload.userId,
      totalBalance: createInvoiceDto.balance,
      ...createInvoiceDto,
    });

    return successConstant;
  }

  async findAll(payload) {
    return this.invoiceRepository.findAndCountAll({
      where: {
        userId: payload.userId,
      },
    });
  }

  async findOne(invoiceNumber: string) {
    try {
      const invoice = await this.checkInvoice(invoiceNumber);

      if (!invoice) {
        throw new NotFoundException({ message: 'invoice not found' });
      }
      return invoice;
    } catch (err) {
      throw new FilterException(err);
    }
  }

  async update(updatePaymentDto: UpdateInvoiceDto, payload) {
    try {
      const { invoiceNumber } = updatePaymentDto;
      if (invoiceNumber) {
        throw new FilterException({ message: 'invoice number must be filled' });
      }

      const checkInvoice = await this.invoiceRepository.findOne({
        where: {
          invoiceNumber: invoiceNumber,
          userId: payload.userId,
        },
      });

      if (!checkInvoice) {
        throw new FilterException({ message: 'cannot update invoice' });
      }

      await this.invoiceRepository.update(updatePaymentDto, {
        where: {
          invoiceNumber,
        },
      });
      return successConstant;
    } catch (err) {
      throw new FilterException(err);
    }
  }

  async createPayment(createPaymentDto: CreatePaymentDto, payload) {
    try {
      const { type, invoiceNumber, amount } = createPaymentDto;

      const checkInvoice = await this.checkInvoice(invoiceNumber);
      if (!checkInvoice) {
        throw new NotFoundException({ message: 'invoice not found' });
      }

      if (type === 'INCOME') {
        //update invoice
        await this.invoiceRepository.update(
          {
            totalBalance: sequelize.literal(
              `totalBalance + createPaymentDto.amount`,
            ),
          },
          {
            where: {
              invoiceNumber: createPaymentDto.invoiceNumber,
            },
          },
        );
      }

      if (type === 'EXPENSE') {
        if (checkInvoice.totalBalance < amount) {
          throw new ForbiddenException({
            message: 'amount in invoice is less than expense',
          });
        }

        await this.invoiceRepository.update(
          {
            totalBalance: sequelize.literal(
              `totalBalance - createPaymentDto.amount`,
            ),
          },
          {
            where: {
              invoiceNumber: createPaymentDto.invoiceNumber,
            },
          },
        );
      }
      await this.incomeExpenseRepo.create({
        ...createPaymentDto,
        userId: payload.userId,
      });
      return successConstant;
    } catch (err) {
      throw new FilterException(err);
    }
  }

  async remove(invoiceNumber: string) {
    try {
      const checkInvoice = await this.checkInvoice(invoiceNumber);
      if (!checkInvoice)
        throw new FilterException({ message: `invoice doesn't exist` });

      await this.invoiceRepository.destroy({
        where: {
          invoiceNumber,
        },
      });
      await this.incomeExpenseRepo.destroy({
        where: {
          invoiceNumber,
        },
      });

      return successConstant;
    } catch (err) {
      throw new FilterException(err);
    }
  }

  async getAllData(payload) {
    //check apakah user admin
    return this.invoiceRepository.findAndCountAll();
  }

  private async checkInvoice(invoiceNumber) {
    return this.invoiceRepository.findOne({
      where: {
        invoiceNumber,
      },
    });
  }
}
