import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useStyles from "../helper/makeStyles";
import useInput from "../hooks/useInput";
import { v4 as uuidv4 } from "uuid";
import {
  useAddNewUserMutation,
  useUpdateUserMutation,
} from "../store/apiSlice";
import { toast } from "react-toastify";

export default function Form(props) {
  const classes = useStyles();
  const [addNewUser, response] = useAddNewUserMutation();
  const [updateNewUser] = useUpdateUserMutation();

  // Name Input
  const {
    enteredInput: enteredName,
    inputValid: nameInputIsValid,
    inputInvalid: nameInputIsInvalid,
    blurHandler: nameInputBlurHandler,
    changeHandler: nameInputChangeHandler,
    reset: nameInputReset,
  } = useInput(
    props.isUpdating ? props.name : "",
    (value) => value.trim() !== ""
  );

  // Email input
  const {
    enteredInput: enteredEmail,
    inputValid: emailInputIsValid,
    inputInvalid: emailInputIsInvalid,
    blurHandler: emailInputBlurHandler,
    changeHandler: emailInputChangeHandler,
    reset: emailInputReset,
  } = useInput(props.isUpdating ? props.email : "", (value) =>
    value.includes("@")
  );

  // Phone number Input
  const {
    enteredInput: enteredPhnNo,
    blurHandler: phnNoInputBlurHandler,
    changeHandler: phnNoInputChangeHandler,
    reset: phnNoInputReset,
  } = useInput(
    props.isUpdating ? props.phone : "",
    (value) => value.length === 10
  );

  // Comment Input
  const {
    enteredInput: enteredComment,
    inputValid: CommentInputIsValid,
    inputInvalid: CommentInputIsInvalid,
    blurHandler: CommentInputBlurHandler,
    changeHandler: CommentInputChangeHandler,
    reset: CommentInputReset,
  } = useInput(
    props.isUpdating ? props.comment : "",
    (value) => value.trim() !== "" && value.length > 0 && value.length <= 1000
  );

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    nameInputBlurHandler();
    emailInputBlurHandler();
    CommentInputBlurHandler();

    if (!nameInputIsValid || !emailInputIsValid || !CommentInputIsValid) {
      return;
    }

    const formData = new FormData();

    formData.append("name", enteredName);
    formData.append("email", enteredEmail);
    formData.append("comment", enteredComment);
    formData.append("phone", enteredPhnNo);
    if (props.isUpdating) {
      formData.append("id", props.id);
      updateNewUser(formData)
        .unwrap()
        .then((res) => {
          if (res.status === 200) {
            toast.success(res?.msg ? res.msg : "Record updated sucessfully!");

            nameInputReset();
            emailInputReset();
            phnNoInputReset();
            CommentInputReset();

            props.closeModal();
          } else {
            const errObj = Object.keys(res.error);
            console.log("errObj", errObj);
            console.log("errror", res.error[errObj[0]][0]);
            toast.error(res?.error[errObj[0]][0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("adding client info");
      formData.append("client_id", uuidv4());

      addNewUser(formData)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          if (res.status === 201) {
            toast.success("Record added successfully!");

            nameInputReset();
            emailInputReset();
            phnNoInputReset();
            CommentInputReset();

            props.closeModal();
          } else {
            const errObj = Object.keys(res.error);
            console.log("errObj", errObj);
            console.log("errror", res.error[errObj[0]][0]);
            toast.error(res?.error[errObj[0]][0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {props.isUpdating && <h2>Update Your Details</h2>}
      {!props.isUpdating && <h2>Add New Details</h2>}

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <div className="form-container">
          {/* Name Input */}
          <div className="inp">
            <TextField
              id="name"
              label="Name"
              value={enteredName}
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
              className="form-controls"
            />
            {nameInputIsInvalid && <p className="error"> Please enter text!</p>}
          </div>

          {/* Email Input */}
          <div className="inp">
            <TextField
              id="email"
              label="Email"
              className="form-controls"
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {emailInputIsInvalid && (
              <p className="error"> Please enter a valid email address!</p>
            )}
          </div>

          {/* Phone No. Input */}
          <div className="inp">
            <TextField
              id="phone no"
              label="Phone Number"
              type="text"
              className="form-controls"
              value={enteredPhnNo}
              onChange={phnNoInputChangeHandler}
              onBlur={phnNoInputBlurHandler}
            />
          </div>

          {/* Comment Input */}
          <div className="inp">
            <TextField
              id="comment"
              label="Comment"
              className="form-controls"
              value={enteredComment}
              onChange={CommentInputChangeHandler}
              onBlur={CommentInputBlurHandler}
            />
            {CommentInputIsInvalid && (
              <p className="error">
                Your comment must contain a maximum of 1000 characters
              </p>
            )}
          </div>
        </div>

        <div className="save">
          <Button
            variant="contained"
            color="secondary"
            type="button"
            className="save"
            style={{ marginRight: "10px" }}
            onClick={() => props.closeModal()}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="save"
          >
            {props.isUpdating ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
}
