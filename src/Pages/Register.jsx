import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../api/axios";
import * as z from "zod";

const formSchema = z
  .object({
    name: z.string().min(2, "UserName should be greater than 2"),
    email: z.string().min(2, "Email is required"),
    password: z.string().min(6, "Password is required"),
    confirmPassword: z.string().min(6, "confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: "/assets/profile.jpg",
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  let newErrors = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      formSchema.parse(form);

      if (
        form.name.trim() &&
        form.email.trim() &&
        form.password.trim() &&
        form.confirmPassword.trim()
      ) {
        const { name, email, password, profile } = form;

        const response = await api.post("/register", {
          name,
          email,
          password,
          profile,
        });
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/");
      }
    } catch (error) {
      if (error.issues) {
        error.issues.forEach((issue) => {
          newErrors[issue.path[0]] = issue.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ error: "register failed" });
      }
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gradient-custom flex items-center justify-center">
      <div className="card bg-white p-5 shadow-sm w-[250px]">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <label htmlFor="name" className="fieldset-legend">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="input input-sm w-50"
              placeholder="User Name"
              value={form.name}
              onChange={handleChange}
            />
          </fieldset>
          {errors.name && (
            <p className="text-red-600 text-[10px]"> {errors.name}</p>
          )}
          <fieldset className="fieldset">
            <label htmlFor="email" className="fieldset-legend">
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              className="input input-sm w-50"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
          </fieldset>
          {errors.email && (
            <p className="text-red-600 text-[10px]"> {errors.email}</p>
          )}

          <fieldset className="fieldset">
            <label htmlFor="password" className="fieldset-legend ">
              Password
            </label>
            <input
              id="password"
              type="text"
              name="password"
              className="input input-sm w-50"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </fieldset>
          {errors.password && (
            <p className="text-red-600 text-[10px]"> {errors.password}</p>
          )}
          <fieldset className="fieldset">
            <label htmlFor="confirmPassword" className="fieldset-legend ">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="text"
              name="confirmPassword"
              className="input input-sm w-50"
              placeholder="confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </fieldset>
          {errors.confirmPassword && (
            <p className="text-red-600 text-[10px]">
              {" "}
              {errors.confirmPassword}
            </p>
          )}
          <br />

          <button
            className="btn btn-sm w-50
                         bg-blue-700 text-white shadow-xs shadow-cyan-900 border-0 "
          >
            {" "}
            Register
          </button>
          <div>
            <span className="text-[10px]">Already Have an Account?</span>
            <Link to="/login" className="text-[12px] text-blue-700 ms-2">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
