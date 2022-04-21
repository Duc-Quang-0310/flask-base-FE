import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { SnackBar } from "../Snackbar/SnackBar";

enum ActionType {
  ENCODE = "Encode",
  DECODE = "Decode",
}
interface SendAwayObj {
  paragraph: string;
  type: ActionType;
}

const TextRSA = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<string>("");
  const [messageType, setMessageType] = React.useState<
    "success" | "error" | null
  >(null);
  const [sendAwayObj, setSendAwayObj] = React.useState<SendAwayObj>({
    paragraph: "",
    type: ActionType.ENCODE,
  });

  const handleClose = (reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setSendAwayObj({
      ...sendAwayObj,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = async (link: string, text: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post(link, { text });
      setResult(data.string);
      setMessage("Voilà, Your result is here check it out");
      setMessageType("error");
    } catch (error: any) {
      const err = error.response.reason as string;
      console.log("err: ", err);
      setMessage("Something went wrong please try again");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { paragraph, type } = sendAwayObj;
    if (paragraph === "") {
      setMessage("Not a valid paragraph");
      setMessageType("error");
      return;
    }

    if (type === ActionType.ENCODE) {
      await fetchData("http://localhost:5555/account/encode-text", paragraph);
      return;
    }

    await fetchData("http://localhost:5555/account/decode-text", paragraph);
  };

  return (
    <Container
      sx={{ minHeight: "93.4vh" }}
      maxWidth={false}
      className="background-image"
    >
      <div className="container">
        <h1 className="header-h1">
          Upload a text or an paragraph
          <br /> to translate to encode with RSA
        </h1>

        <form action="submit" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex">
            <TextField
              placeholder="Input your paragraph"
              multiline
              autoFocus={true}
              rows={10}
              onChange={(e) => handleChange(e)}
              sx={{
                width: "30rem",
                background: "#fff",
              }}
              name="paragraph"
              value={sendAwayObj.paragraph}
            />
            <Select
              defaultValue={ActionType.ENCODE}
              sx={{
                background: "#1976d2",
                color: "#fff",
                marginInline: "3rem",
                marginBlock: "auto",
              }}
              onChange={(e) => handleChange(e)}
              name="type"
              value={sendAwayObj.type}
            >
              <MenuItem value={ActionType.ENCODE}>{ActionType.ENCODE}</MenuItem>
              <MenuItem value={ActionType.DECODE}>{ActionType.DECODE}</MenuItem>
            </Select>

            <TextField
              placeholder="Result will be displayed in here"
              multiline
              disabled={true}
              rows={10}
              sx={{
                width: "30rem",
                background: "#fff",
              }}
              value={result}
            />
          </div>

          <div className="flex">
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "28rem",
                fontSize: "17px",
                paddingBlock: "20px",
                letterSpacing: "3px",
                borderRadius: "50px",
                marginInline: "auto",
                marginTop: "2.5rem",
              }}
            >
              {!loading ? (
                "Begin action"
              ) : (
                <CircularProgress sx={{ color: "#fff" }} />
              )}
            </Button>
          </div>
        </form>

        {message && message !== null && messageType !== null && (
          <SnackBar
            openState={open}
            handleClose={handleClose}
            SnackBarType={messageType}
            message={message}
          />
        )}
      </div>
    </Container>
  );
};

export default TextRSA;
