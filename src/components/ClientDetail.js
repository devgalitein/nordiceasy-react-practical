import { Button, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";

function ClientDetail(props) {
  return (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, marginBottom: "10px" }}
          color="text.secondary"
          gutterBottom
        >
          <span style={{ fontWeight: "bold" }}>Name:</span> {props.name}
        </Typography>
        <Typography
          sx={{ fontSize: 14, marginBottom: "10px" }}
          color="text.secondary"
          gutterBottom
        >
          <span style={{ fontWeight: "bold" }}>Email:</span> {props.email}
        </Typography>
        <Typography
          sx={{ fontSize: 14, marginBottom: "10px" }}
          color="text.secondary"
          gutterBottom
        >
          <span style={{ fontWeight: "bold" }}>Phone Number:</span>{" "}
          {props.phone}
        </Typography>
        <Typography
          sx={{ fontSize: 14, marginBottom: "10px" }}
          color="text.secondary"
          gutterBottom
        >
          <span style={{ fontWeight: "bold" }}>Comment:</span> {props.comment}
        </Typography>
        <Typography
          sx={{ fontSize: 14, marginBottom: "10px" }}
          color="text.secondary"
          gutterBottom
        >
          <span style={{ fontWeight: "bold" }}>Client Id:</span>{" "}
          {props.clientId}
        </Typography>
      </CardContent>
      <CardActions dir="right">
        <Button onClick={props.closeModal}>Close</Button>
      </CardActions>
    </React.Fragment>
  );
}

export default ClientDetail;
