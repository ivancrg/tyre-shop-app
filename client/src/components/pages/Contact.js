import React from "react";
import Axios from "axios";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

export default function Contact() {
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

  const {
    /*register,*/ handleSubmit,
    /*watch,*/ errors,
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);

    const mailData = {
      first_name: data["first_name"],
      last_name: data["last_name"],
      email: data["email"],
      subject: data["subject"],
      message: data["message"],
    };

    Axios.post("http://localhost:3001/api/sendMail", mailData).then(
      (response) => {
        if (response.data === "success") {
          reset({
            first_name: "",
            last_name: "",
            email: "",
            subject: "",
            message: "",
          });

          setOpenSuccess(true);
          //alert("Poruka je poslana.");
        } else {
          setOpenError(true);
          //alert("Došlo je do greške. Provjerite podatke.");
        }
      }
    );
  };

  React.useEffect(() => {
    if (
      errors.first_name ||
      errors.last_name ||
      errors.email ||
      errors.subject ||
      errors.message ||
      errors.terms_conditions
    ) {
      setOpenError(true);
    }
  }, [errors]);

  return (
    <>
      <form className="contact" onSubmit={handleSubmit(onSubmit)}>
        <div className="form--container">
          <p className="title">Kontaktirajte nas</p>
          <Controller
            name="first_name"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                id="first_name"
                variant="outlined"
                label="Ime"
                className="container--item"
                placeholder="Ivan"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.first_name}
                helperText={errors?.first_name?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
              pattern: {
                value: /^[A-Za-zšđčćžŠĐČĆŽ]+$/i,
                message: "Unesite ime.",
              },
            }}
          />

          <Controller
            name="last_name"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                variant="outlined"
                id="surname"
                label="Prezime"
                name="last_name"
                placeholder="Horvat"
                className="container--item"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.last_name}
                helperText={errors?.last_name?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
              pattern: {
                value: /^[A-Za-zšđčćžŠĐČĆŽ]+$/i,
                message: "Unesite prezime.",
              },
            }}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                variant="outlined"
                id="e_mail"
                label="Adresa e-pošte"
                placeholder="ivan.horvat@mail.com"
                className="container--item"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.email}
                helperText={errors?.email?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Unesite adresu e-pošte.",
              },
            }}
          />

          <Controller
            name="subject"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                variant="outlined"
                id="subject"
                label="Predmet"
                placeholder="Predmet"
                className="container--item"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.subject}
                helperText={errors?.subject?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
              pattern: {
                message: "Unesite predmet.",
              },
            }}
          />

          <Controller
            name="message"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextareaAutosize
                aria-label="Sadržaj poruke"
                id="message"
                rowsMin={5}
                placeholder="  Poruka..."
                className="comment--textarea"
                value={value}
                onChange={onChange}
                inputref={ref}
              />
            )}
            rules={{
              required: true,
              message: "Unesite poruku.",
            }}
          />
        </div>

        <div className="form--container">
          <Controller
            name="terms_conditions"
            control={control}
            defaultValue={false}
            rules={{ required: true, message: "nune" }}
            render={(props) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => props.onChange(e.target.checked)}
                    checked={props.value}
                  />
                }
                label="Slažem se s Odredbama i uvjetima te Pravilima privatnosti"
              />
            )}
          />

          <Button
            className="submit--button"
            linkon="0"
            buttonsize="btn--large"
            buttonstyle="btn--primary"
            type="submit"
          >
            KONTAKTIRAJ
          </Button>
        </div>
      </form>

      <div className="contact--info">
        <div className="contact--info--row">
          <div className="contact--info--column--title">Vlasnik</div>
          <div className="contact--info--column">
            <div className="contact--info--row">Ivan Horvat</div>
            <div className="contact--info--row">Mobitel: +385 98 765 43 21</div>
            <div className="contact--info--row">
              E-mail: ivan.horvat@mail.hr
            </div>
          </div>
        </div>

        <div className="contact--info--row">
          <div className="contact--info--column--title">Voditelj poduzeća</div>
          <div className="contact--info--column">
            <div className="contact--info--row">Petar Perić</div>
            <div className="contact--info--row">Mobitel: +385 98 123 45 67</div>
            <div className="contact--info--row">
              E-mail: petar.peric@mail.hr
            </div>
          </div>
        </div>
      </div>

      <div className={classes.root}>
        <Snackbar
          open={openSuccess}
          autoHideDuration={3750}
          onClose={handleCloseSuccess}
        >
          <Alert onClose={handleCloseSuccess} severity="success">
            Poruka je uspješno poslana.
          </Alert>
        </Snackbar>

        <Snackbar
          open={openError}
          autoHideDuration={3750}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error">
            Došlo je do greške. Provjerite podatke i prihvatite uvjete.
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
