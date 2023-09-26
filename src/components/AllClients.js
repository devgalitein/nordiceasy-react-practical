import React from "react";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SingleClientRow from "./SingleClientRow";
import { useGetUsersQuery } from "../store/apiSlice";
import LoadingSpinner from "./LoadingSpinner";

function AllClients(props) {
  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
      maxWidth: 1200,
      margin: "0 auto",
    },
    head: {
      borderBottom: "1px solid black",
      "& th": {
        fontWeight: "bolder",
      },
    },
    pnStyle: {
      minWidth: "100px",
    },
    actionHeadStyle: {
      minWidth: "200px",
    },
    spRoot: {
      width: "100%",
      height: "calc( 100vh - 100px )",
      display: "flex",
    },
    root: {
      "& > *": {
        margin: "10px",
      },
    },
  }));

  const { data: users, isLoading: isGetLoading } = useGetUsersQuery({
    refetchOnMountOrArgChange: true,
  });

  console.log("users ", users);

  const classes = useStyles();

  return (
    <>
      {isGetLoading ? (
        <div className={classes.spRoot}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {users && users.data && users.data.length > 0 && (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.head}>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell className={classes.pnStyle}>
                      Phone number
                    </TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>Client Id</TableCell>
                    <TableCell className={classes.actionHeadStyle}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.data.map((data) => {
                    return (
                      <SingleClientRow
                        key={data.id}
                        id={data.id}
                        name={data.name}
                        email={data.email}
                        phone={data.phone}
                        city={data.city}
                        comment={data.comment}
                        clientId={data.clientId}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {users && users.data && users.data.length === 0 && (
            <h2 style={{ width: "100%", textAlign: "center" }}>
              No records found!
            </h2>
          )}
        </>
      )}
    </>
  );
}

export default AllClients;
