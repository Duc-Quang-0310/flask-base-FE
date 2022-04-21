import React from "react";
import { Formik as FormValidation } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress, Typography } from "@mui/material";

interface SignUpFormInitValue {
  email: string;
  password: string;
  reTypePassword: string;
}

interface SignUpProps {
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
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

export const SignUp: React.FC<SignUpProps> = ({ setDisable }) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  async function submit(params: SignUpFormInitValue) {
    try {
      console.log("params: ", params);
      setLoading(true);
      setDisable(loading);
      //handle axios
    } catch (error: any) {
      const response: any = error.response;
      setErrorMessage(response.message);
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
        onSubmit={async (values: SignUpFormInitValue, { setSubmitting }) => {
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
              Hello nice to see <span className="text-highlight"> you!</span>
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
                "Sign Up"
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
