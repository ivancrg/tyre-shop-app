import "../../App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { parse, format, toDate } from "date-fns";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 225,
  },
}));

const columns = [
  { id: "idorder", label: "ID", minWidth: 15 },
  { id: "buyer_name", label: "Ime", minWidth: 75 },
  { id: "buyer_surname", label: "Prezime", minWidth: 75 },
  { id: "offer_code", label: "Kod", minWidth: 15 },
  { id: "quantity", label: "Količina", minWidth: 25 },
  { id: "e_mail", label: "E-mail", minWidth: 75 },
  { id: "phone_no", label: "Mobitel", minWidth: 50 },
  { id: "comments", label: "Komentar", minWidth: 75 },
  { id: "service_date_time", label: "Termin", minWidth: 50 },
  { id: "receipt_no", label: "Broj računa", minWidth: 50 },
  { id: "tyre_dimension", label: "Dimenzija guma", minWidth: 50 },
];

function AppointmentManager() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [appointmentList, setAppointmentList] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/login", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      setLoginStatus(response.data.loggedIn);
    });
  }, []);

  var appointmentDate = format(toDate(new Date()), "yyyy-MM-dd'T'HH:mm");
  function setAppointmentDate(date) {
    appointmentDate = date;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getAppointments").then((response) => {
      setAppointmentList(response.data);
    });
  }, []);

  function refreshTableData() {
    Axios.get("http://localhost:3001/api/getAppointments").then((response) => {
      setAppointmentList(response.data);
    });
  }

  function editAppointment(id, newAppointment, receipt) {
    Axios.put("http://localhost:3001/api/editAppointment", {
      id: id,
      newAppointment: newAppointment,
      receipt: receipt,
    });

    refreshTableData();
    refreshTableData();

    setOpenSuccess(true);
  }

  function deleteAppointment(id) {
    Axios.delete(`http://localhost:3001/api/deleteAppointment/${id}`);

    refreshTableData();
    refreshTableData();

    setOpenSuccess(true);
  }

  const classes = useStyles();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  if (!loginStatus) {
    return (
      <div className="manager--login--button">
        <Button
          linkon="0"
          className="btns"
          buttonstyle="btn--outline"
          buttonsize="btn--large"
          href="/login"
        >
          PRIJAVI SE
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="appointmentManager">
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}

                  <TableCell key="title_edit">Izmjena termina</TableCell>
                  <TableCell key="title_delete">Brisanje termina</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointmentList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id] ? row[column.id] : "/";

                          return (
                            <TableCell
                              key={column.id + row["idorder"]}
                              align={column.align}
                            >
                              {value !== "/" &&
                              column.id === "service_date_time"
                                ? format(
                                    parse(
                                      value.toString(),
                                      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
                                      new Date()
                                    ),
                                    "yyyy-MM-dd' u 'HH:mm"
                                  )
                                : value}
                            </TableCell>
                          );
                        })}

                        <TableCell
                          key={"edit_appointment" + row["idorder"]}
                          align="center"
                        >
                          <Popup
                            trigger={
                              <Button linkon="0" buttonstyle="btn--primary">
                                IZMJENI
                              </Button>
                            }
                            maxWidth="200px"
                            maxHeight="auto"
                            modal
                            nested
                            contentStyle={{
                              width: "275px",
                              border: "3px solid #242424",
                              borderRadius: "5px",
                            }}
                          >
                            {(close) => (
                              <div className="modal">
                                <div className="header"> Odabir termina </div>
                                <div className="content">
                                  <form className="container" noValidate>
                                    <TextField
                                      id={"datetime-local" + row["idorder"]}
                                      label="Uredi termin..."
                                      type="datetime-local"
                                      required
                                      defaultValue={format(
                                        toDate(new Date()),
                                        "yyyy-MM-dd'T'HH:mm"
                                      ).toString()}
                                      className={classes.textField}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                    {!row["receipt_no"] ? (
                                      <TextField
                                        id={"receipt-no-input" + row["idorder"]}
                                        label="Upiši broj računa..."
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </form>
                                </div>

                                <div className="actions">
                                  <Button
                                    buttonstyle="btn--primary"
                                    linkon="0"
                                    onClick={() => {
                                      setAppointmentDate(
                                        document.getElementById(
                                          "datetime-local" + row["idorder"]
                                        ).value
                                      );

                                      let date = parse(
                                        appointmentDate
                                          .toString()
                                          .replace("T", " "),
                                        "yyyy-MM-dd HH:mm",
                                        new Date()
                                      );

                                      if (
                                        date.toString() !== "Invalid Date" &&
                                        date.toString() !== ""
                                      ) {
                                        if (!row["receipt_no"]) {
                                          //nema racun, treba procitat je li unesen
                                          var receipt = document
                                            .getElementById(
                                              "receipt-no-input" +
                                                row["idorder"]
                                            )
                                            .value.toString()
                                            .replace(/\s/g, "");

                                          if (receipt === "") {
                                            setOpenError(true);
                                            //alert("Nevaljan unos broja računa!");
                                          } else {
                                            editAppointment(
                                              row["idorder"],
                                              appointmentDate
                                                .toString()
                                                .replace("T", " "),
                                              receipt
                                            );

                                            close();
                                          }
                                        } else {
                                          editAppointment(
                                            row["idorder"],
                                            appointmentDate
                                              .toString()
                                              .replace("T", " "),
                                            ""
                                          );

                                          close();
                                        }
                                      } else {
                                        setOpenError(true);
                                        //alert("Nevaljan unos termina!");
                                      }
                                    }}
                                  >
                                    POTVRDI
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Popup>
                        </TableCell>

                        <TableCell
                          key={"delete_appointment" + row["idorder"]}
                          align="center"
                        >
                          <Button
                            linkon="0"
                            onClick={() => {
                              if (window.confirm("Sigurno želite obrisati?"))
                                deleteAppointment(row["idorder"]);
                            }}
                            buttonstyle="btn--primary"
                          >
                            OBRIŠI
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={appointmentList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      <div className={classes.root}>
        <Snackbar
          open={openSuccess}
          autoHideDuration={3750}
          onClose={handleCloseSuccess}
        >
          <Alert onClose={handleCloseSuccess} severity="success">
            Uspješno izvršeno.
          </Alert>
        </Snackbar>

        <Snackbar
          open={openError}
          autoHideDuration={3750}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error">
            Došlo je do greške. Provjerite podatke.
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default AppointmentManager;
