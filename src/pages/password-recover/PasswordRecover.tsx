import React from "react";
import { TextField, Button, CircularProgress, Typography } from "@mui/material";
import { Formik as FormValidation } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { SnackBar } from "../Snackbar/SnackBar";

interface PasswordRecoverProps {
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PasswordRecoverFormInitValue {
  email: string;
  password: string;
  reTypePassword: string;
}

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(10, "Your email is too short")
    .max(30, "Your email is too long")
    .required("This field can not be empty"),
  password: Yup.string()
    .min(6, "Incorrect password length")
    .max(20, "Incorrect password length")
    .required("This field can not be empty"),
  reTypePassword: Yup.string()
    .min(6, "Incorrect password length")
    .max(20, "Incorrect password length")
    .required("This field can not be empty")
    .oneOf([Yup.ref("password")], "Password retype doesn't match "),
});

export const PasswordRecover: React.FC<PasswordRecoverProps> = ({
  setDisable,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [openState, setopenState] = React.useState<boolean>(false);

  async function submit(params: PasswordRecoverFormInitValue) {
    try {
      setErrorMessage("");
      setLoading(true);
      setDisable(loading);
      //handle axios

      const { data } = await axios.patch(
        "http://localhost:5555/account/password-recover",
        { username: params.email, password: params.password },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setMessage(data.message);
      setopenState(true);
    } catch (error: any) {
      const response: any = error.response;
      setErrorMessage(response.data.reason);
    } finally {
      setLoading(false);
      setDisable(loading);
    }
  }

  function renderError() {
    if (errorMessage !== "") {
      return <div className="error-box">{errorMessage}</div>;
    }
  }

  return (
    <React.Fragment>
      <FormValidation
        initialValues={{ email: "", password: "", reTypePassword: "" }}
        validationSchema={validateSchema}
        onSubmit={async (
          values: PasswordRecoverFormInitValue,
          { setSubmitting }
        ) => {
          await submit(values);
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleBlur,
          touched,
          errors,
          values,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="sign-in-form">
            <Typography textAlign="center" variant="h4" my="2rem">
              Get your account <span className="text-highlight"> back!</span>
            </Typography>
            {renderError()}
            <TextField
              id="outlined-email"
              label="Username"
              type="text"
              variant="outlined"
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ marginBottom: "2rem" }}
              placeholder="johndoe@hotmail.com"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              id="standard-password"
              label="Password"
              type="password"
              variant="outlined"
              value={values.password}
              name="password"
              style={{ marginBottom: "2rem" }}
              placeholder="lovelyMuffin"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              id="standard-reTypePassword"
              label="Password Confirm"
              type="reTypePassword"
              variant="outlined"
              value={values.reTypePassword}
              name="reTypePassword"
              style={{ marginBottom: "2rem" }}
              placeholder="lovelyMuffin"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.reTypePassword && Boolean(errors.reTypePassword)}
              helperText={touched.reTypePassword && errors.reTypePassword}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              style={{
                paddingBlock: "1rem",
                fontSize: "20px",
                fontWeight: "500",
                letterSpacing: "2px",
                marginTop: "1rem",
              }}
            >
              {loading === false ? (
                "Password Recover"
              ) : (
                <CircularProgress color="inherit" />
              )}
            </Button>
          </form>
        )}
      </FormValidation>
      <SnackBar
        openState={openState}
        SnackBarType="success"
        handleClose={setopenState}
        message={message}
      />
    </React.Fragment>
  );
};
