import React from "react";
import { useState } from "react";
import "../../App.css";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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
  button: {
    margin: theme.spacing(1),
  },
}));

export default function OfferManager() {
  const classes = useStyles();
  const { register, handleSubmit, /*watch,*/ errors, control } = useForm();
  const [loginStatus, setLoginStatus] = useState(false);
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

  Axios.defaults.withCredentials = true;

  React.useEffect(() => {
    Axios.get("http://localhost:3001/login", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      setLoginStatus(response.data.loggedIn);
    });
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("picture", data.img_src[0]);
    formData.append("name", data["name"]);
    formData.append("data", data["data"]);
    formData.append("price", data["price"]);
    formData.append("img_alt", data["img_alt"]);

    const res = await fetch("http://localhost:3001/api/insertOffer", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    setOpenSuccess(true);
  };

  React.useEffect(() => {
    if (
      errors.name ||
      errors.data ||
      errors.price ||
      errors.img_alt ||
      errors.img_src
    ) {
      setOpenError(true);
    }
  }, [errors]);

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
      <form className="offerManager" onSubmit={handleSubmit(onSubmit)}>
        <div className="form--container">
          <p className="title">Novi unos</p>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                id="name"
                variant="outlined"
                label="Naziv"
                placeholder="Bridgestone Blizzak LM005"
                className="container--item"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.name}
                helperText={errors?.name?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
              pattern: {
                value: /^[0-9+\-/A-Za-zšđčćžŠĐČĆŽ ]+$/i,
                message: "Unesite naziv.",
              },
            }}
          />

          <Controller
            name="data"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                id="name"
                variant="outlined"
                label="Opis"
                placeholder=" Jedan od najboljih načina za zadržavanje prianjanja..."
                className="container--item"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.data}
                helperText={errors?.data?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
            }}
          />

          <Controller
            name="price"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                variant="outlined"
                id="price"
                label="Cijena (u HRK)"
                name="price"
                placeholder="1234,05"
                className="container--item"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.price}
                helperText={errors?.price?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
              pattern: {
                value: /^[0-9,]+$/i,
                message: "Unesite cijenu.",
              },
            }}
          />

          <Controller
            name="img_alt"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                variant="outlined"
                id="img_alt"
                label="Alternativni tekst kod greške sa slikom"
                placeholder="Bridgestone Blizzak LM005"
                className="container--item"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.img_alt}
                helperText={errors?.img_alt?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
            }}
          />

          <div>
            <input
              name="img_src"
              id="myInput"
              type="file"
              ref={register}
              style={{ display: "none" }}
            />

            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
              onClick={(e) => document.getElementById("myInput").click()}
            >
              Izaberi sliku
            </Button>
          </div>
        </div>

        <div className="form--container">
          <Button
            className="submit--button"
            linkon="0"
            buttonsize="btn--large"
            buttonstyle="btn--primary"
            type="submit"
          >
            UNESI
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
            Nova ponuda uspješno unesena.
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
