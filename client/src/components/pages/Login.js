import { React, useEffect, useState } from "react";
import "../../App.css";
import Axios from "axios";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  const { /*register,*/ handleSubmit, /*watch,*/ errors, control } = useForm();

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
        alert("Provjerite unesene podatke.");
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
        alert("Uspješno ste odjavljeni.");
      } else {
        alert("Došlo je do greške.");
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
              label="Lozinka"
              className="container--item"
              placeholder="lozinka"
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
  );
}
