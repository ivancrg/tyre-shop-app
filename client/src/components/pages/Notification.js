import React from "react";
import "../../App.css";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button, Radio, RadioGroup } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
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

export default function Notification() {
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

    Axios.put("http://localhost:3001/api/updateNotification", {
      receipt: data["receipt_number"],
      notification_mode: data["notification_mode"],
      notification_interval: data["notification_interval"],
    }).then((response) => {
      if (!response.data) {
        setOpenError(true);
        //alert("Došlo je do greške, provjerite broj računa.");
      } else {
        reset({
          receipt: "",
          notification_mode: "",
          notification_interval: "",
        });
        setOpenSuccess(true);
        // alert("Uspješno zapisan način obavještavanja.");
      }
    });
  };

  React.useEffect(() => {
    if (
      errors.receipt ||
      errors.notification_mode ||
      errors.notification_interval
    ) {
      setOpenError(true);
    }
  }, [errors]);

  return (
    <>
      <form className="notification" onSubmit={handleSubmit(onSubmit)}>
        <div className="form--container">
          <p className="title">Podaci za kontakt</p>
          <Controller
            name="receipt_number"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <TextField
                id="receipt_number"
                variant="outlined"
                label="Broj računa"
                className="container--item"
                placeholder="12345-1234-123"
                size="small"
                value={value}
                onChange={onChange}
                inputRef={ref}
                error={!!errors.receipt_number}
                helperText={errors?.receipt_number?.message || ""}
              />
            )}
            rules={{
              required: "Obavezno polje",
              pattern: {
                value: /^[0-9\-/]+$/i,
                message: "Unesite broj računa.",
              },
            }}
          />

          <Controller
            name="notification_mode"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <FormControl
                variant="outlined"
                className="container--item"
                size="small"
              >
                <InputLabel id="notification_mode_label">
                  Način obavijesti
                </InputLabel>
                <Select
                  labelId="notification_mode_label"
                  id="notification-mode-select"
                  label="Način obavijesti"
                  value={value}
                  onChange={onChange}
                  inputRef={ref}
                  error={!!errors.notification_mode}
                >
                  <MenuItem value="1">E-mail</MenuItem>
                  <MenuItem value="2">SMS poruka</MenuItem>
                  <MenuItem value="3">Telefonski poziv</MenuItem>
                </Select>
              </FormControl>
            )}
            rules={{
              required: true,
            }}
          />

          <Controller
            name="notification_interval"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <FormControl className="container--item">
                <RadioGroup
                  defaultValue="30_min"
                  value={value}
                  onChange={onChange}
                  inputref={ref}
                >
                  <FormControlLabel
                    value="10 minuta prije"
                    control={<Radio />}
                    label="10 minuta prije"
                  />
                  <FormControlLabel
                    value="30 minuta prije"
                    control={<Radio />}
                    label="30 minuta prije"
                  />
                  <FormControlLabel
                    value="Svakih 30 minuta"
                    control={<Radio />}
                    label="Svakih 30 minuta"
                  />
                  <FormControlLabel
                    value="Svakih sat vremena"
                    control={<Radio />}
                    label="Svakih sat vremena"
                  />
                </RadioGroup>
              </FormControl>
            )}
            rules={{
              required: true,
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
            OBAVIJESTI ME
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
            Uspješno zapisan način obavještavanja.
          </Alert>
        </Snackbar>

        <Snackbar
          open={openError}
          autoHideDuration={3750}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error">
            Došlo je do greške, molimo provjerite unesene podatke.
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
