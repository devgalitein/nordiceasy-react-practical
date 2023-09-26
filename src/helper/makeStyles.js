import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    "& .form-container": {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      "& .inp": {
        width: "47%",
        "& .form-controls": {
          width: "100%",
        },
        "& > *": {
          marginTop: "15px",
          width: "100%",
          display: "flex",
        },
      },
    },
    "& .error": {
      borderColor: "red",
      color: "red",
      fontSize: "12px",
      letterSpacing: "1px",
    },
    "& > .save": {
      width: "auto",
      float: "right",
      margin: "30px",
      marginBottom: "25px",
    },
    "& .gender-courses": {
      marginTop: "25px",
      width: "100%",
      display: "flex",
      // alignItems: "center",
      "& > *": {
        width: "100%",
        "& > *": {
          width: "94%",
        },
      },
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  button: {
    display: "block",
    marginTop: "10px",
  },
  formControl: {
    margin: "10px",
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: "10px",
  },
}));
