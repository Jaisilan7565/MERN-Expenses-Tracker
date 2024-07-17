import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginAPI } from "../../services/users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";

import { useNavigate } from "react-router-dom";

//Validations
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Email is required."),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const LoginForm = () => {
  //Navigate to Login Form after Successful Register
  const navigate = useNavigate();

  //Dispatch instance for storing the response from server
  const dispatch = useDispatch();

  // Mutation
  const { mutateAsync, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  //Handeling the form using Formik
  const formik = useFormik({
    initialValues: {
      initialValues: { email: "", password: "" },
    },
    //Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      //Http Request
      mutateAsync(values)
        .then((data) => {
          // console.log(data);
          dispatch(loginAction(data));

          //Save the user in local storage
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  //Redirect to Login
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/profile");
      }
    }, 2000);
  }, [isPending, isError, isSuccess]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Login
      </h2>
      {/* Display messages */}

      {isPending && <AlertMessage type="loading" message="Login you in..." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}
      {isSuccess && <AlertMessage type="success" message="Login Success" />}

      <p className="text-sm text-center text-gray-500">
        Login to access your account
      </p>

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
