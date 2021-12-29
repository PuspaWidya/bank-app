import {
  AllowNull,
  BeforeCreate,
  Column,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { RoleType } from 'src/common/enum';

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

  @Length({ msg: 'min : 5, max : 30', min: 5, max: 30 })
  @Column({ allowNull: false })
  password: string;

  @Column({ defaultValue: RoleType.USER })
  role: RoleType;

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
}
