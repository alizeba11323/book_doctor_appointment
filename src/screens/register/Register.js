import { Box, FormHelperText, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAlertMessage, useModal } from "../../util/AuthProvider";
import { LoadingButton } from "@mui/lab";
import { RegisterUser } from "../../util/fetch";

function Register() {
  const form = useForm();
  const { setIsOpen } = useModal();
  const { register, handleSubmit, formState } = form;
  const { errors, touchedFields } = formState;
  const [loading, setLoading] = useState(false);
  const { setMessageObj } = useAlertMessage();
  const onSubmit = (data) => {
    setLoading(true);
    RegisterUser(data).then(() => {
      setLoading(false);
      setIsOpen(false);
      setMessageObj((prev) => ({
        ...prev,
        alertOpen: true,
        type: "success",
        content: "Register User Successfully",
      }));
    });
  };
  return (
    <Box>
      <TextField
        id="firstname"
        aria-describedby="my-helper-text"
        type="text"
        name="firstname"
        label="FirstName"
        variant="standard"
        sx={{ marginBottom: "20px" }}
        required
        {...register("firstname", {
          required: { value: true, message: "Please fill out this field" },
        })}
      />
      {touchedFields?.firstname && errors?.firstname?.type === "required" && (
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
          {errors?.firstname?.message}
        </Box>
      )}

      <TextField
        id="lastname"
        aria-describedby="my-helper-text"
        type="text"
        name="LastName"
        label="LastName"
        variant="standard"
        sx={{ marginBottom: "20px" }}
        required
        {...register("lastname", {
          required: { value: true, message: "Please fill out this field" },
        })}
      />
      {touchedFields?.lastname && errors?.lastname?.type === "required" && (
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
          {errors?.lastname?.message}
        </Box>
      )}
      <TextField
        id="email"
        required
        aria-describedby="my-helper-text"
        type="email"
        variant="standard"
        label="Email"
        name="email"
        sx={{ marginBottom: "20px" }}
        {...register("email", {
          required: { value: true, message: "Please fill out this field" },
          pattern: {
            value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
            message: "Enter valid Email",
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
        <FormHelperText sx={{ color: "red", marginTop: "-20px" }}>
          {errors?.email?.message}
        </FormHelperText>
      )}

      <TextField
        id="password"
        name="password"
        required
        aria-describedby="my-helper-text"
        type="password"
        variant="standard"
        label="Password"
        sx={{ marginBottom: "20px" }}
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
            marginTop: "-20px",
          }}
        >
          {errors?.password?.message}
        </Box>
      )}
      <TextField
        id="mobile"
        name="mobile"
        required
        label="Mobile No"
        variant="standard"
        aria-describedby="my-helper-text"
        type="text"
        {...register("mobile", {
          required: { value: true, message: "Please fill out this field" },
        })}
      />
      {touchedFields?.mobile && errors?.mobile?.type === "required" && (
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
          {errors?.mobile?.message}
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
        <span>Register</span>
      </LoadingButton>
    </Box>
  );
}

export default Register;
