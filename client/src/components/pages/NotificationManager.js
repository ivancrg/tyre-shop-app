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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { parse, format, toDate } from "date-fns";

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const columns = [
  { id: "idorder", label: "ID", minWidth: 15, sortable: true },
  { id: "buyer_name", label: "Ime", minWidth: 75, sortable: true },
  { id: "buyer_surname", label: "Prezime", minWidth: 75, sortable: true },
  { id: "offer_code", label: "Kod", minWidth: 15, sortable: true },
  { id: "quantity", label: "Količina", minWidth: 25, sortable: true },
  { id: "e_mail", label: "E-mail", minWidth: 75, sortable: false },
  { id: "phone_no", label: "Mobitel", minWidth: 50, sortable: false },
  { id: "comments", label: "Komentar", minWidth: 75, maxWidth: 400, sortable: false},
  { id: "service_date_time", label: "Termin", minWidth: 50, sortable: true },
  { id: "receipt_no", label: "Broj računa", minWidth: 50, sortable: true },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const sortHeaders = ["e-mail", "phone_no", "comments"]

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{minWidth: column.minWidth}}
              sortDirection={orderBy === column.id && column.sortable ? order : false}
            >
              <TableSortLabel
                active={orderBy === column.id && column.sortable}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {(orderBy === column.id) && column.sortable ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Obavijesti
        </Typography>
      }

      {
        <Tooltip title="Filtriraj listu">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function NotificationManager() {
  //const [page, setPage] = useState(0);
  //const [rowsPerPage, setRowsPerPage] = useState(10);
  const [notificationList, setNotificationList] = useState([]);
  const [notificationDate, setNotificationDate] = useState(
    format(toDate(new Date()), "yyyy-MM-dd'T'HH:mm")
  );

  /*const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  */

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getAppointments").then((response) => {
      setNotificationList(response.data);
    });
  }, []);

  function refreshTableData() {
    Axios.get("http://localhost:3001/api/getAppointments").then((response) => {
      setNotificationList(response.data);
    });
  }

  function editNotification(id, newNotification, receipt) {
    Axios.put("http://localhost:3001/api/editAppointment", {
      id: id,
      newNotification: newNotification,
      receipt: receipt,
    });

    refreshTableData();
    refreshTableData();
  }

  function deleteNotification(id) {
    Axios.delete(`http://localhost:3001/api/deleteAppointment/${id}`);

    refreshTableData();
    refreshTableData();
  }

  //const classes = useStyles();

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('idorder');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = notificationList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="notificationManager">
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length}/>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <EnhancedTableHead 
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={notificationList.length}
            />
            <TableBody>
              {stableSort (notificationList, getComparator(order, orderBy))
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
                            style={{minWidth: column.minWidth, maxWidth: column.maxWidth, whiteSpace: 'nowrap', overflow: 'auto'}}
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

                      <TableCell
                        key={"edit_notification" + row["idorder"]}
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
                                    setNotificationDate(
                                      document.getElementById(
                                        "datetime-local" + row["idorder"]
                                      ).value
                                    );

                                    let date = parse(
                                      notificationDate
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
                                            "receipt-no-input" + row["idorder"]
                                          )
                                          .value.toString()
                                          .replace(/\s/g, "");

                                        if (receipt === "") {
                                          alert("Nevaljan unos broja računa!");
                                        } else {
                                          editNotification(
                                            row["idorder"],
                                            notificationDate
                                              .toString()
                                              .replace("T", " "),
                                            receipt
                                          );

                                          close();
                                        }
                                      } else {
                                        editNotification(
                                          row["idorder"],
                                          notificationDate
                                            .toString()
                                            .replace("T", " "),
                                          ""
                                        );

                                        close();
                                      }
                                    } else {
                                      alert("Nevaljan unos termina!");
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
                        key={"delete_notification" + row["idorder"]}
                        align="center"
                      >
                        <Button
                          linkon="0"
                          onClick={() => { if (window.confirm("Sigurno želite obrisati?"))
                            deleteNotification(row["idorder"]);
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
