import React, { useState } from "react";
import "../register/form.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  //   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    try {
      event.preventDefault();
      let response = await axios.post("http://localhost:3001/auth/login", data);
      localStorage.setItem("access_token", response?.data?.access_token);
      //   navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="register">
        <h1>Login</h1>

        <form>
          <input
            type="text"
            name="username"
            placeholder="Username"
            {...register("username", { required: true, maxLength: 20 })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
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
    </>
  );
}
