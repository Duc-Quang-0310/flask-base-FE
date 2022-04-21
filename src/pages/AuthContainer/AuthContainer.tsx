import React from "react";
import { Container, Box, Tab } from "@mui/material";
import "./AuthContainer.css";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { SignIn } from "../sign-in/SignIn";
import { SignUp } from "../sign-up/SignUp";
import { PasswordRecover } from "../password-recover/PasswordRecover";
import { withStyles } from "@mui/styles";

const ActionTab = withStyles({
  root: {
    color: "#ffffff !important",
    paddingInline: "40px !important",
    paddingBlock: "30px !important",
    "&.Mui-selected": {
      color: "#ffffff !important",
    },
  },
})(Tab);

const AuthContainer = () => {
  const [value, setValue] = React.useState("sign-in-tab");
  const [disable, setDisable] = React.useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth={false}>
      <Box height="100vh" position="relative" overflow="hidden">
        <img
          src="/images/blue-mountain.jpg"
          title="blue-mountain"
          className="background-image"
          alt="Blue mountain"
        />

        <Box className="auth-form">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} className="auth-tab">
                <ActionTab
                  label="Sign In"
                  value="sign-in-tab"
                  className="auth-tab_detail"
                  disabled={disable}
                />
                <ActionTab
                  label="Sign Up"
                  value="sign-up-tab"
                  className="auth-tab_detail"
                  disabled={disable}
                />
                <ActionTab
                  label="Password Recover"
                  value="password-recover-tab"
                  className="auth-tab_detail"
                  disabled={disable}
                />
              </TabList>
            </Box>
            <TabPanel value="sign-in-tab" style={{ flexGrow: 1 }}>
              <SignIn setDisable={setDisable} />
            </TabPanel>
            <TabPanel value="sign-up-tab" style={{ flexGrow: 1 }}>
              <SignUp setDisable={setDisable} />
            </TabPanel>
            <TabPanel value="password-recover-tab" style={{ flexGrow: 1 }}>
              <PasswordRecover setDisable={setDisable} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthContainer;
