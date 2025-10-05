import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import * as z from "zod";
import { api } from "../api/axios";

const formSchema = z.object({
  email: z.string().min(2, "Email is required"),
  password: z.string().min(6, "Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: null, password: null });
  let newErrors = { email: null, password: null };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      formSchema.parse(form);

      if (form.email.trim() && form.password.trim()) {
        const response = await api.post("/login", form);

        const { accessToken, user } = response.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/");
      }
      setErrors(newErrors);
    } catch (error) {
      if (error.issues) {
        error.issues.forEach((issue) => {
          newErrors[issue.path[0]] = issue.message;
        });
        setErrors(newErrors);
      } else if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        setErrors({
          email: null,
          password: null,
          error: "Invalid email or password",
        });
      } else {
        setErrors({ email: null, password: null, error: "Login failed" });
      }
    }
  };

  const handleChange = (e) => {
    setErrors(newErrors);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gradient-custom flex items-center justify-center">
      <div className="card bg-white p-5 shadow-sm w-[250px]">
        <form onSubmit={handleSubmit}>
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

          {errors.error && (
            <p className="text-red-600 text-[10px]"> {errors.error}</p>
          )}
          <br />

          <button className="btn btn-sm w-50 bg-blue-700 text-white shadow-xs shadow-cyan-900 border-0 ">
            Log in
          </button>
          <div>
            <span className="text-[10px]">Dont't Have an Account?</span>
            <Link to="/register" className="text-[12px] text-blue-700 ms-2">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
