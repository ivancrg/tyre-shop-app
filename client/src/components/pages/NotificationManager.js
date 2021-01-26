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
import TableSortLabel from "@material-ui/core/TableSortLabel";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@material-ui/core";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core";
import { parse, format } from "date-fns";
import Select from "@material-ui/core/select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm, Controller } from "react-hook-form";

const columns = [
  { id: "idorder", label: "ID", minWidth: 15 },
  { id: "buyer_name", label: "Ime", minWidth: 75 },
  { id: "buyer_surname", label: "Prezime", minWidth: 75 },
  { id: "offer_code", label: "Kod", minWidth: 15 },
  { id: "quantity", label: "Količina", minWidth: 25 },
  { id: "service_date_time", label: "Termin", minWidth: 50 },
  { id: "receipt_no", label: "Broj računa", minWidth: 50 },
];

const columnsUnsortable = [
  { id: "notification_mode", label: "Način kontaktiranja", minWidth: 50 },
  {
    id: "notification_interval",
    label: "Interval kontaktiranja",
    minWidth: 50,
  },
  { id: "e_mail", label: "E-mail", minWidth: 75 },
  { id: "phone_no", label: "Mobitel", minWidth: 50 },
  { id: "comments", label: "Komentar", minWidth: 75, maxWidth: 400 },
  { id: "tyre_dimension", label: "Dimenzija guma", minWidth: 50 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const StickyTableCell = withStyles((theme) => ({
  head: {
    position: "sticky",
    left: 0,
    zIndex: theme.zIndex.appBar + 2,
  },
  body: {
    position: "sticky",
    left: 0,
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.appBar + 1,
  },
}))(TableCell);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const {
    classes,
    /*onSelectAllClick,*/
    order,
    orderBy,
    /*numSelected,
    rowCount,*/
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StickyTableCell className={classes.head}>
          Slanje obavijesti
        </StickyTableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {columnsUnsortable.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function NotificationManager() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [notificationList, setNotificationList] = useState([]);

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

  const { /*register,*/ handleSubmit, /*watch,*/ errors, control } = useForm();

  const onSubmit = (data) => {
    var notification_select = data["notification_select"].split("_");
    let mode = notification_select[0];
    let email = notification_select[1];
    let time = format(
      parse(notification_select[2], "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()),
      "yyyy-MM-dd' u 'HH:mm"
    );

    if (mode !== "1") {
      alert("Došlo je do greške.");
      return;
    }

    const mailData = {
      email: email,
      subject: "Obavijest o terminu izmjene guma - Gumiservis GS",
      message:
        "Poštovani,\n\nOvim Vas putem obavještavamo kako će se Vaša izmjena guma izvršiti " +
        time +
        " sati.\n\nSrdačan pozdrav,\nGumiservis GS",
    };

    sendNotification(mailData);
  };

  const sendNotification = (mailData) => {
    Axios.post("http://localhost:3001/api/sendNotification", mailData).then(
      (response) => {
        if (response.data === "success") {
          alert("Obavijest uspješno poslana.");
        } else {
          alert("Došlo je do greške.");
        }
      }
    );
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getAppointments").then((response) => {
      setNotificationList(response.data);
    });
  }, []);

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("idorder");
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    <div className="notificationManager">
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={notificationList.length}
              onSelectAllClick={() => {}}
            />
            <TableBody>
              {stableSort(notificationList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <StickyTableCell className={classes.cell}>
                        <Popup
                          trigger={
                            <Button
                              disabled={
                                row["service_date_time"] !== null ? false : true
                              }
                              linkon="0"
                              buttonstyle="btn--primary"
                            >
                              OBAVIJESTI
                            </Button>
                          }
                          maxWidth="200px"
                          maxHeight="auto"
                          modal
                          nested
                          contentStyle={{
                            width: "275px",
                            height: "auto",
                            border: "3px solid #242424",
                            borderRadius: "3px",
                          }}
                        >
                          {(close) => (
                            <div className="modal">
                              <div className="header">Slanje obavijesti</div>
                              <div className="content">
                                <div className="container">
                                  <div className="message">
                                    Osoba {row["buyer_name"]}{" "}
                                    {row["buyer_surname"]} će biti obaviještena.{" "}
                                    <br />
                                  </div>
                                </div>

                                {!row["notification_mode"] ? (
                                  <form
                                    className="container"
                                    onSubmit={handleSubmit(onSubmit)}
                                  >
                                    <Controller
                                      name="notification_select"
                                      control={control}
                                      defaultValue=""
                                      render={({ onChange, value, ref }) => (
                                        <FormControl
                                          variant="outlined"
                                          className="notification--select"
                                          size="small"
                                        >
                                          <InputLabel
                                            id="notification"
                                            label="Odaberi način kontaktiranja..."
                                          >
                                            Obavijesti putem...
                                          </InputLabel>
                                          <Select
                                            labelId="notification"
                                            id={
                                              "notification_method" +
                                              row["idorder"]
                                            }
                                            defaultValue="1"
                                            value={value}
                                            onChange={onChange}
                                            inputRef={ref}
                                            error={!!errors.notification_select}
                                          >
                                            <MenuItem
                                              value={
                                                "1_" +
                                                row["e_mail"] +
                                                "_" +
                                                row["service_date_time"]
                                              }
                                            >
                                              E-mail
                                            </MenuItem>
                                            <MenuItem
                                              value={
                                                "2_" +
                                                row["e_mail"] +
                                                "_" +
                                                row["service_date_time"]
                                              }
                                            >
                                              SMS poruka
                                            </MenuItem>
                                            <MenuItem
                                              value={
                                                "3_" +
                                                row["e_mail"] +
                                                "_" +
                                                row["service_date_time"]
                                              }
                                            >
                                              Telefonski poziv
                                            </MenuItem>
                                          </Select>
                                        </FormControl>
                                      )}
                                      rules={{
                                        required: true,
                                      }}
                                    />

                                    <Button
                                      buttonstyle="btn--primary"
                                      linkon="0"
                                      type="submit"
                                      className="button"
                                    >
                                      POTVRDI
                                    </Button>
                                  </form>
                                ) : (
                                  <div className="container">
                                    <div className="message">
                                      Kontakt:{" "}
                                      {row["notification_mode"] === 3
                                        ? "Poziv " + row["phone_no"]
                                        : row["notification_mode"] === 2
                                        ? "SMS " + row["phone_no"]
                                        : "E-mail " + row["e_mail"]}
                                    </div>

                                    <Button
                                      buttonstyle="btn--primary"
                                      linkon="0"
                                      type="submit"
                                      className="button"
                                      onClick={() => {
                                        if (row["notification_mode"] !== 1) {
                                          alert("Došlo je do greške.");
                                          close();
                                          return;
                                        }

                                        let time = format(
                                          parse(
                                            row["service_date_time"],
                                            "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
                                            new Date()
                                          ),
                                          "yyyy-MM-dd' u 'HH:mm"
                                        );

                                        const mailData = {
                                          email: row["e_mail"],
                                          subject:
                                            "Obavijest o terminu izmjene guma - Gumiservis GS",
                                          message:
                                            "Poštovani,\n\nOvim Vas putem obavještavamo kako će se Vaša izmjena guma izvršiti " +
                                            time +
                                            " sati.\n\nSrdačan pozdrav,\nGumiservis GS",
                                        };

                                        sendNotification(mailData);

                                        close();
                                      }}
                                    >
                                      POTVRDI
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Popup>
                      </StickyTableCell>
                      {columns.map((column) => {
                        const value = row[column.id] ? row[column.id] : "/";

                        return (
                          <TableCell
                            key={column.id + row["idorder"]}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              maxWidth: column.maxWidth,
                              whiteSpace: "nowrap",
                              overflow: "auto",
                            }}
                          >
                            {value !== "/" && column.id === "service_date_time"
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

                      {columnsUnsortable.map((column) => {
                        const value = row[column.id] ? row[column.id] : "/";

                        return (
                          <TableCell
                            key={column.id + row["idorder"]}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              maxWidth: column.maxWidth,
                              whiteSpace: "nowrap",
                              overflow: "auto",
                            }}
                          >
                            {value !== "/" && column.id === "notification_mode"
                              ? {
                                  1: "E-mail",
                                  2: "SMS",
                                  3: "Telefonski poziv",
                                }[value]
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={notificationList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default NotificationManager;
