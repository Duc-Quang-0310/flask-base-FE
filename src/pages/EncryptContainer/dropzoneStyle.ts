export const baseStyle: React.CSSProperties | undefined = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  width: "30rem",
  height: "20rem",
  transition: "border .24s ease-in-out",
  boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.09)",
  borderStartStartRadius: "40px",
  borderEndStartRadius: "40px",
  borderEndEndRadius: "40px",
  borderStartEndRadius: "40px",
};

export const focusedStyle: React.CSSProperties | undefined = {
  borderColor: "#2196f3",
};

export const acceptStyle: React.CSSProperties | undefined = {
  borderColor: "#00e676",
};

export const rejectStyle: React.CSSProperties | undefined = {
  borderColor: "#ff1744",
};
