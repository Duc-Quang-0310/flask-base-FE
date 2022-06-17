import React from "react";
import { TextField, Button, CircularProgress, Typography } from "@mui/material";
import { Formik as FormValidation } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validateSchema = Yup.object().shape({
  username: Yup.string()
    .email()
    .min(10, "Your email is too short")
    .max(30, "Your email is too long")
    .required("This field can not be empty"),
  password: Yup.string()
    .min(6, "Password length must be greater than 6 letter")
    .max(12, "Password length must be smaller than 12 letter")
    .required("This field can not be empty"),
});

interface LoginFormInitValue {
  username: string;
  password: string;
}

interface SignInProps {
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignIn: React.FC<SignInProps> = ({ setDisable }) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const navigate = useNavigate();

  async function submit(params: LoginFormInitValue) {
    try {
      console.log("params: ", params);
      setLoading(true);
      setDisable(loading);
      const { data } = await axios.post(
        "http://localhost:6200/account/sign-in",
        params
      );

      localStorage.setItem("userId", data.userId);
      navigate("/home");
      //handle axios
    } catch (error: any) {
      const response: any = error.response.data;
      setErrorMessage(response.reason);
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
        initialValues={{ username: "", password: "" }}
        validationSchema={validateSchema}
        onSubmit={async (values: LoginFormInitValue, { setSubmitting }) => {
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
              Welcome <span className="text-highlight"> back!</span>
            </Typography>
            {renderError()}
            <TextField
              id="outlined-email"
              label="Email"
              type="text"
              variant="outlined"
              value={values.username}
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ marginBottom: "2rem" }}
              placeholder="johndoe@hotmail.com"
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
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
                "Sign In"
              ) : (
                <CircularProgress color="inherit" />
              )}
            </Button>
          </form>
        )}
      </FormValidation>
    </React.Fragment>
  );
};
