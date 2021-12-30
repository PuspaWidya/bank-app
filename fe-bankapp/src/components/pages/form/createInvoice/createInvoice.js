import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateInvoice() {
  //   const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [submittedDate, setSubmittedDate] = useState();

  let local = localStorage.getItem("access_token");

  const onSubmit = async (data, event) => {
    try {
      event.preventDefault();
      setSubmittedDate(new Date(submittedDate));

      await axios.post(
        "http://localhost:3001/payment/invoice",
        {
          ...data,
          submittedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${local}`,
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
        <h1>Create Invoice</h1>

        <form>
          <label htmlFor=""> Type Invoice * </label>
          <select {...register("type", { required: true })}>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">expense</option>
          </select>

          {errors.type && <p className="error"> Type Invoice required</p>}

          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            {...register("invoiceNumber", { required: true })}
          />

          {errors.invoiceNumber && (
            <p className="error"> Invoice Number required</p>
          )}
          <input
            type="text"
            name="note"
            placeholder="Note for Invoice"
            {...register("note", {
              required: true,
            })}
          />

          {errors.type && <p className="error"> Note for Invoice required</p>}
          <input
            type="number"
            name="balance"
            placeholder="Balance In Invoice"
            {...register("balance", {
              required: true,
            })}
          />

          <DatePicker
            selected={submittedDate}
            onChange={(date) => setSubmittedDate(date)}
          />

          <button type="button" onClick={handleSubmit(onSubmit)}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
