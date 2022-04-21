import { Container } from "@mui/material";
import React from "react";
import EncryptContainer from "../EncryptContainer/EncryptContainer";

const Home = () => {
  return (
    <Container
      sx={{ minHeight: "93.4vh" }}
      maxWidth={false}
      className="background-image"
    >
      <EncryptContainer />
    </Container>
  );
};

export default Home;
