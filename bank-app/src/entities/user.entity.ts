import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Validate,
} from 'sequelize-typescript';

import { v4 as uuid } from 'uuid';
import { IncomeExpense } from './IncomeExpense.entity';

const bcrypt = require('bcryptjs');

@Table
export class User extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false, validate: { isEmail: true } })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column
  userCode: string;

  //   @Column
  //   division: string;

  //user & super user
  @Column
  role: string;

  @HasMany(() => IncomeExpense)
  incomeExpenseId: string;

  @BeforeCreate
  static generate(user: User) {
    user.id = uuid();
  }

  @BeforeCreate
  static async hashPassword(user: User) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }

  @BeforeCreate
  static generateCode(user) {
    user.userCode = 'ADM-' + user.id;
  }
}
