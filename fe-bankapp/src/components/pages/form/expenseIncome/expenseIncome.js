import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

export default function ExpenseIncome() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  let access_token = localStorage.getItem("access_token");

  const onSubmit = async (data, event) => {
    try {
      event.preventDefault();

      await axios.post(
        "http://localhost:3001/payment/incomeExpense",
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      //   navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="register">
        <h1>Income and Expense </h1>

        <form>
          <label htmlFor=""> type * </label>
          <select {...register("type", { required: true })}>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">expense</option>
          </select>

          {errors.type && <p className="error"> Type Invoice required</p>}

          <label htmlFor=""> Invoice Number * </label>
          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            {...register("invoiceNumber", { required: true })}
          />

          {errors.invoiceNumber && (
            <p className="error"> Invoice Number required</p>
          )}

          <label htmlFor=""> Description * </label>
          <input
            type="text"
            name="description"
            placeholder="description for Invoice"
            {...register("description", {
              required: true,
            })}
          />

          {errors.description && (
            <p className="error"> Description for Invoice required</p>
          )}

          <label htmlFor=""> Amount * </label>
          <input
            type="number"
            name="amount"
            placeholder="Amount In Invoice"
            {...register("amount", {
              required: true,
            })}
          />
          {errors.amount && (
            <p className="error"> Amount item in Invoice required</p>
          )}

          <label htmlFor=""> Quantity * </label>
          <input
            type="number"
            name="quantity"
            placeholder="quantity In Invoice"
            {...register("quantity", {
              required: true,
            })}
          />

          {errors.quantity && (
            <p className="error"> Quantity item in Invoice required</p>
          )}

          <label htmlFor=""> Unit Price * </label>
          <input
            type="number"
            name="unitPrice"
            placeholder="unitPrice In Invoice"
            {...register("unitPrice", {
              required: true,
            })}
          />

          {errors.unitPrice && (
            <p className="error"> Unit Price Item in Invoice required</p>
          )}

          <label htmlFor=""> Payment Receiver * </label>

          <input
            type="text"
            name="paymentReceiver"
            placeholder="paymentReceiver for Invoice"
            {...register("paymentReceiver", {
              required: true,
            })}
          />

          {errors.paymentReceiver && (
            <p className="error"> Receiver of Invoice required</p>
          )}

          <label htmlFor=""> paymentMethod * </label>
          <select {...register("paymentMethod", { required: true })}>
            <option value="CASH">Cash</option>
            <option value="CHECK">Check</option>
            <option value="DEBIT">Debit</option>
            <option value="CREDIT">Credit</option>
            <option value="MBANKING">M-banking</option>
          </select>

          {errors.paymentMethod && (
            <p className="error"> Payment Method Invoice required</p>
          )}

          <button type="button" onClick={handleSubmit(onSubmit)}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
