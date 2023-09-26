import React from "react";
import { makeStyles } from "@mui/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Form from "./Form";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDeleteUserMutation } from "../store/apiSlice";
import { toast } from "react-toastify";
import ClientDetail from "./ClientDetail";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `50%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  main: {
    "& > td": {
      paddingTop: "0",
      paddingBottom: "0",
    },
  },
  table: {
    minWidth: 650,
  },
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& > *": {
      margin: "10px auto",
    },
  },
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: "white",
    border: "2px solid lightblue",
    padding: "16px 24px 20px",
  },
  paperView: {
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid lightblue",
    padding: "16px 24px 20px",
  },
}));

function SingleClientRow(props) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [deleteUser] = useDeleteUserMutation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenViewModal = () => {
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  // alert("hey");
  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to Delete?")) {
      // Save it!
      deleteUser(props.id)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            toast.success(res.msg);
          } else {
            toast.error("Something went wrong!");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Form closeModal={handleClose} isUpdating={true} {...props} />
    </div>
  );

  const bodyOfViewModal = (
    <div style={modalStyle} className={classes.paperView}>
      <ClientDetail closeModal={handleCloseViewModal} {...props} />
    </div>
  );

  return (
    <>
      <TableRow className={classes.main}>
        <TableCell component="th" scope="row">
          {props.name}
        </TableCell>
        <TableCell>{props.email}</TableCell>
        <TableCell>{props.phone}</TableCell>
        <TableCell>{props.comment}</TableCell>
        <TableCell>{props.clientId}</TableCell>
        <TableCell>
          <div className={classes.root}>
            <Button
              variant="contained"
              color="info"
              onClick={handleOpenViewModal}
            >
              <VisibilityIcon />
            </Button>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteHandler}
            >
              <DeleteForeverIcon />
            </Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>

          <Modal
            open={openViewModal}
            onClose={handleCloseViewModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {bodyOfViewModal}
          </Modal>
        </TableCell>
      </TableRow>
    </>
  );
}

export default SingleClientRow;
