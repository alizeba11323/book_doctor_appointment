import { Box, FormHelperText, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAlertMessage, useAuth, useModal } from "../../util/AuthProvider";
import { LoadingButton } from "@mui/lab";
import { LoginUser } from "../../util/fetch";

function Login() {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors, touchedFields } = formState;
  const [loading, setLoading] = useState(false);
  const { setMessageObj } = useAlertMessage();
  const { setIsLoggedIn } = useAuth();
  const { setIsOpen } = useModal();
  const onSubmit = (data) => {
    setLoading(true);
    LoginUser(data).then((data) => {
      setLoading(false);
      if (data.length > 0) {
        localStorage.setItem("logged_in", JSON.stringify(data[0]));
        setMessageObj((prev) => ({
          ...prev,
          alertOpen: true,
          type: "success",
          content: "Logged In Successfully",
        }));
        setIsLoggedIn(true);
        setIsOpen(false);
      } else {
        setMessageObj((prev) => ({
          ...prev,
          alertOpen: true,
          type: "error",
          content: "Wrong Credentials",
        }));
      }
    });
  };
  return (
    <Box>
      <TextField
        type="email"
        id="email"
        name="email"
        variant="standard"
        label="Email"
        sx={{ marginBottom: "20px" }}
        required
        {...register("email", {
          required: { value: true, message: "Please fill out this field" },
          pattern: {
            value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
            message: "Enter Valid Email",
          },
        })}
      />

      {touchedFields?.email && errors?.email?.type === "required" && (
        <Box
          sx={{
            background: "#444242",
            color: "white",
            padding: "10px",
            width: "150px",
            textAlign: "center",
            borderRadius: "4px",
            fontSize: "13px",
            marginTop: "-20px",
          }}
        >
          {errors?.email?.message}
        </Box>
      )}
      {touchedFields?.email && errors?.email?.type === "pattern" && (
        <FormHelperText sx={{ color: "red" }}>
          {errors?.email?.message}
        </FormHelperText>
      )}

      <TextField
        id="password"
        variant="standard"
        label="Password"
        name="password"
        type="password"
        required
        {...register("password", {
          required: { value: true, message: "Please fill out this field" },
        })}
      />

      {touchedFields?.password && errors?.password?.type === "required" && (
        <Box
          sx={{
            background: "#444242",
            color: "white",
            padding: "10px",
            width: "150px",
            textAlign: "center",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        >
          {errors?.password?.message}
        </Box>
      )}

      <LoadingButton
        variant="contained"
        sx={{
          display: "flex",
          margin: "auto",
          marginTop: "20px;",
        }}
        onClick={handleSubmit(onSubmit)}
        loading={loading}
      >
        <span>Login</span>
      </LoadingButton>
    </Box>
  );
}

export default Login;
