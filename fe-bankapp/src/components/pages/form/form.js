import React from "react";
import "../form/form.css";

import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, event) => {
    console.log({ data });
    console.log({ event });
  };
  console.log(errors);
  return (
    <div>
      <h1>Create an Account</h1>
      <form>
        <label> Username * </label>
        <input
          type="text"
          name="username"
          {...register("username", { required: true, maxLength: 20 })}
        />
        {errors.username && <p className="error"> Username required</p>}

        <label> Name * </label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true, maxLength: 20, minLength: 5 })}
        />

        <label> Email * </label>
        <input
          type="email"
          name="email"
          {...register("email", {
            required: true,
            maxLength: 30,
            minLength: 5,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />

        {errors.email && errors.email.type == "required" && (
          <p className="error"> Email Required</p>
        )}
        {errors.email && errors.email.type == "pattern" && (
          <p className="error">Invalid Email</p>
        )}

        <label htmlFor=""> Password * </label>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          {...register("password", {
            required: true,
            maxLength: 20,
            minLength: 5,
          })}
        />

        <label htmlFor=""> Confirm Password * </label>
        <input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register("password", {
            required: true,
            maxLength: 20,
            minLength: 5,
          })}
        />

        <button type="button" onClick={handleSubmit(onSubmit)}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
