import { React, useEffect, useState } from "react";
import "../../App.css";
import Axios from "axios";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

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
}));

export default function Login() {
  const { /*register,*/ handleSubmit, /*watch,*/ errors, control } = useForm();

  const [loginStatus, setLoginStatus] = useState(false);

  const classes = useStyles();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

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

  // const onSubmit = (data) => {
  //   console.log(data);
  //   Axios.post("http://localhost:3001/register", {
  //     username: data["username"],
  //     password: data["pass"],
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const onSubmit = (data) => {
    console.log(data);
    Axios.post("http://localhost:3001/login", {
      username: data["username"],
      password: data["pass"],
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
        setOpenError(true);
        //alert("Provjerite unesene podatke.");
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
      }
    });
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response.data);
    });
  };

  const logout = () => {
    Axios.get("http://localhost:3001/logout", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.data) {
        setLoginStatus(false);
        setOpenSuccess(true);
        //alert("Uspješno ste odjavljeni.");
      } else {
        setOpenError(true);
        //alert("Došlo je do greške.");
      }
    });
  };

  // React.useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  if (loginStatus && userAuthenticated) {
    return (
      <>
        <div className="loggedin--info">
          <div className="loggedin--info--row">
            <div className="loggedin--info--column--title">
              Upravitelj terminima
            </div>
            <div className="loggedin--info--column">
              <div className="loggedin--info--row">
                <Button
                  linkon="0"
                  className="btns"
                  buttonstyle="btn--primary"
                  buttonsize="btn--large"
                  href="/appointmentManager"
                >
                  POKRENI
                </Button>
              </div>
            </div>
          </div>

          <div className="loggedin--info--row">
            <div className="loggedin--info--column--title">
              Upravitelj obavijestima
            </div>
            <div className="loggedin--info--column">
              <div className="loggedin--info--row">
                <Button
                  linkon="0"
                  className="btns"
                  buttonstyle="btn--primary"
                  buttonsize="btn--large"
                  href="/notificationManager"
                >
                  POKRENI
                </Button>
              </div>
            </div>
          </div>

          <div className="loggedin--info--row">
            <div className="loggedin--info--column--title">
              Upravitelj ponudama
            </div>
            <div className="loggedin--info--column">
              <div className="loggedin--info--row">
                <Button
                  linkon="0"
                  className="btns"
                  buttonstyle="btn--primary"
                  buttonsize="btn--large"
                  href="/offerManager"
                >
                  POKRENI
                </Button>
              </div>
            </div>
          </div>

          <div className="loggedin--info--row">
            <div className="loggedin--info--column--title">Odjava</div>
            <div className="loggedin--info--column">
              <div className="loggedin--info--row">
                <Button
                  linkon="0"
                  className="btns"
                  buttonstyle="btn--primary"
                  buttonsize="btn--large"
                  onClick={logout}
                >
                  ODJAVI SE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <form className="login" onSubmit={handleSubmit(onSubmit)}>
        <div className="form--container">
          <p className="title">Podaci za prijavu</p>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                id="username"
                variant="outlined"
                label="Korisničko ime"
                className="container--item"
                placeholder="korisnicko_ime"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.username}
                helperText={errors?.username?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
              pattern: {
                value: /^[a-zA-Z0-9\-_.:]+$/i,
                message: "Unesite korisničko ime.",
              },
            }}
          />

          <Controller
            name="pass"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                id="pass"
                variant="outlined"
                type="password"
                label="Lozinka"
                className="container--item"
                placeholder="Lozinka"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.pass}
                helperText={errors?.pass?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
              pattern: {
                value: /^.{7,37}$/,
                message: "Unesite lozinku (7-37 znakova).",
              },
            }}
          />
        </div>

        <div className="form--container">
          <Button
            className="submit--button"
            linkon="0"
            buttonsize="btn--large"
            buttonstyle="btn--primary"
            type="submit"
          >
            PRIJAVI SE
          </Button>
        </div>
      </form>

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
