import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';
import { RoleType } from 'src/common/enum';
import { successConstant } from 'src/common/errorCode';
import { FilterException } from 'src/common/filterException';
import { IncomeExpense } from 'src/entities/IncomeExpense.entity';
import Invoice from 'src/entities/invoice.entity';
import { User } from 'src/entities/user.entity';
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
      const invoice = await this.invoiceRepository.findOne({
        where: {
          invoiceNumber,
        },
        include: [{ model: IncomeExpense }],
      });
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

      if (!invoiceNumber) {
        throw new FilterException({ message: 'invoice number must be filled' });
      }

      const checkInvoice = await this.invoiceRepository.findOne({
        where: {
          invoiceNumber: invoiceNumber,
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
        await this.invoiceRepository.increment('totalBalance', {
          by: amount,
          where: { invoiceNumber },
        });
      }

      if (type === 'EXPENSE') {
        if (checkInvoice.totalBalance < amount) {
          throw new ForbiddenException({
            message: 'amount in invoice is less than expense',
          });
        }

        await this.invoiceRepository.increment('totalBalance', {
          by: -amount,
          where: { invoiceNumber },
        });
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

  async remove(invoiceNumber: string, payload) {
    try {
      if (payload.role !== RoleType.SUPERUSER) {
        throw new UnauthorizedException({
          message: 'only super user that can delete invoice',
        });
      }

      const checkInvoice = await this.checkInvoice(invoiceNumber);
      if (!checkInvoice) {
        throw new FilterException({ message: `invoice doesn't exist` });
      }

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
    try {
      if (payload.role !== RoleType.SUPERUSER) {
        throw new UnauthorizedException({
          message: 'only super user that can see it',
        });
      }
      return this.invoiceRepository.findAndCountAll({
        include: [{ model: User }],
      });
    } catch (err) {
      throw new FilterException(err);
    }
  }

  private async checkInvoice(invoiceNumber) {
    return this.invoiceRepository.findOne({
      where: {
        invoiceNumber,
      },
      include: [{ model: IncomeExpense }],
    });
  }
}
