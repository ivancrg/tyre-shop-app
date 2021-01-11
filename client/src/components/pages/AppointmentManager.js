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
];

function AppointmentManager() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    Axios.get("http://192.168.5.90:3001/api/getAppointments").then(
      (response) => {
        setAppointmentList(response.data);
      }
    );
  }, []);

  function editAppointment(id) {
    console.log(id);
    console.log("edit");
  }

  function deleteAppointment(id) {
    console.log(id);
    console.log("delete");

    Axios.delete(`http://localhost:3001/api/deleteAppointment/${id}`);
  }

  function confirmAppointment(id) {
    console.log(id);
    console.log("confirm");
  }

  return (
    <div class="appointmentManager" id="root--div">
      <Paper class="appointmentManager" id="paper">
        <TableContainer class="appointmentManager" id="container">
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
                <TableCell key="title_confirm">Potvrda termina</TableCell>
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
                        //if(value === null) value = "/";
                        return (
                          <TableCell
                            key={column.id + row["idorder"]}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}

                      <TableCell
                        key={"edit_appointment" + row["idorder"]}
                        align="right"
                      >
                        <Button
                          linkon="0"
                          onClick={() => {
                            editAppointment(row["idorder"]);
                          }}
                          buttonstyle="btn--primary"
                        >
                          Izmjeni
                        </Button>
                      </TableCell>

                      <TableCell
                        key={"delete_appointment" + row["idorder"]}
                        align="right"
                      >
                        <Button
                          linkon="0"
                          onClick={() => {
                            deleteAppointment(row["idorder"]);
                          }}
                          buttonstyle="btn--primary"
                        >
                          Obriši
                        </Button>
                      </TableCell>

                      <TableCell
                        key={"confirm_appointment" + row["idorder"]}
                        align="right"
                      >
                        <Button
                          linkon="0"
                          onClick={() => {
                            confirmAppointment(row["idorder"]);
                          }}
                          buttonstyle="btn--primary"
                        >
                          Potvrdi
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
          class="appointmentManager"
          id="pageSelect"
        />
      </Paper>
    </div>
  );
}

export default AppointmentManager;
