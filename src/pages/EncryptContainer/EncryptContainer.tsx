import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDropzone } from "react-dropzone";
import {
  acceptStyle,
  baseStyle,
  focusedStyle,
  rejectStyle,
} from "./dropzoneStyle";
import { FileUpload, CloudUpload } from "@mui/icons-material";
import { SnackBar } from "../Snackbar/SnackBar";
import { saveAs } from "file-saver";

const EncryptContainer = () => {
  const formData = new FormData();
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: "image/*" });
  const userId = localStorage.getItem("userId") || "none";
  const [open, setOpen] = React.useState(false);
  const [imageLink, setImageLink] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [watermark, setWatermark] = React.useState<string>("");
  const [messageType, setMessageType] = React.useState<
    "success" | "error" | null
  >(null);

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const sendRequest = async (formSend: FormData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5555/account/encode-picture",
        formSend,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(data.imageLink);
      setImageLink(data.imageLink);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (acceptedFiles.length > 0) {
      setMessageType("success");
      setOpen(true);
      setMessage("Image uploaded");
    }
  }, [acceptedFiles]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.append("userId", userId);
    if (acceptedFiles.length === 0) {
      setMessage("Image haven't been uploaded please upload one to continue");
      setOpen(true);
      setMessageType("error");
      return;
    }

    acceptedFiles.forEach((file) => {
      formData.append("waterMark", watermark ? watermark : "watermark");
      formData.append("image", file, file.name);
    });

    await sendRequest(formData);
  };

  const handleClose = (reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDownload = () => {
    if (imageLink !== null) {
      saveAs(imageLink, "encode.png");
      setMessageType("success");
      setOpen(true);
      setMessage("Image downloaded");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="container">
      <h1 className="header-h1">
        Upload an image to <br /> add watermark you want
      </h1>
      {imageLink === null ? (
        <form
          action="submit"
          aria-label="none"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div {...getRootProps({ style })}>
            <CloudUpload
              sx={{ fontSize: "4rem", marginBottom: "1rem", opacity: "0.6" }}
            />
            <Button
              variant="contained"
              startIcon={<FileUpload />}
              sx={{
                marginBlock: "1rem",
                paddingInline: "20px",
                paddingBlock: "10px",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Upload File
            </Button>
            <label htmlFor="drop-zones">
              <p>Or drag and drop file here</p>
              <input {...getInputProps()} id="drop-zone" />
            </label>
          </div>

          {acceptedFiles.length !== 0 && (
            <TextField
              variant="outlined"
              sx={{
                display: "block",
                marginLeft: "130px",
                marginTop: "50px",
              }}
              onChange={(e) => setWatermark(e.target.value)}
            />
          )}

          <Button
            variant="contained"
            type="submit"
            sx={{
              paddingInline: "140px",
              fontSize: "17px",
              paddingBlock: "20px",
              letterSpacing: "3px",
              borderRadius: "50px",
              marginInline: "auto",
              marginTop: "2.5rem",
            }}
          >
            Add watermark
          </Button>
        </form>
      ) : (
        <>
          <img
            src={imageLink || "asd"}
            className="download-image"
            alt="encode"
          />
          <Button
            variant="contained"
            sx={{
              paddingInline: "140px",
              fontSize: "17px",
              paddingBlock: "20px",
              letterSpacing: "3px",
              borderRadius: "50px",
              marginInline: "auto",
              marginTop: "2.5rem",
            }}
            onClick={() => handleDownload()}
          >
            Download
          </Button>
        </>
      )}

      {message && message !== null && messageType !== null && (
        <SnackBar
          openState={open}
          handleClose={handleClose}
          SnackBarType={messageType}
          message={message}
        />
      )}
    </div>
  );
};

export default EncryptContainer;
