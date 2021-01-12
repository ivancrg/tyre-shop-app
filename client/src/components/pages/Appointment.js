import React, { useState } from "react";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "@material-ui/core";

export default function Appointment() {
  const [termsConditions, setTermsConditions] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorSurname, setErrorSurname] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhoneNo, setErrorPhoneNo] = useState(false);
  const [errorOfferCode, setErrorOfferCode] = useState(false);
  const [errorQuantity, setErrorQuantity] = useState(false);

  return (
    <form className="appointment">
      <div className="form--container">
        <p className="title">Osobni podaci</p>
        <TextField
          error={errorName}
          id="name"
          variant="outlined"
          label="Ime"
          placeholder="Ivan"
          required
          className="container--item"
          //   helperText="Unesite ime."
          size="small"
        />
        <TextField
          error={errorSurname}
          variant="outlined"
          id="surname"
          label="Prezime"
          placeholder="Horvat"
          required
          className="container--item"
          //   helperText="Unesite prezime."
          size="small"
        />
        <TextField
          error={errorEmail}
          variant="outlined"
          id="e_mail"
          label="Adresa e-pošte"
          placeholder="ivan.horvat@mail.com"
          required
          className="container--item"
          //   helperText="Unesite valjanu adresu e-pošte."
          size="small"
        />
        <TextField
          error={errorPhoneNo}
          variant="outlined"
          id="phone_no"
          label="Telefon/mobitel"
          placeholder="0912345678"
          required
          className="container--item"
          //   helperText="Unesite telefon/mobitel."
          size="small"
        />
      </div>

      <div className="form--container">
        <p className="title">Podaci vezani za narudžbu</p>
        <TextField
          error={errorOfferCode}
          variant="outlined"
          id="offer_code"
          label="Šifra proizvoda"
          placeholder="1234567"
          required
          className="container--item"
          //   helperText="Unesite šifru proizvoda."
          size="small"
        />
        <TextField
          error={errorQuantity}
          variant="outlined"
          id="quantity"
          label="Količina"
          placeholder="4"
          required
          className="container--item"
          //   helperText="Unesite količinu."
          size="small"
        />
        <TextField
          variant="outlined"
          id="dimension"
          label="Dimenzija"
          placeholder="195/50/15"
          required
          className="container--item"
          //   helperText="Unesite dimenziju."
          size="small"
        />
        <TextareaAutosize
          aria-label="Dodatni komentar"
          id="comment"
          rowsMin={5}
          placeholder="Komentar..."
          className="comment--textarea"
        />
      </div>

      <div className="form--container">
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => {
                setTermsConditions(event.target.checked);
              }}
              name="checkTermsConditions"
              id="checkTermsConditions"
            />
          }
          label="Slažem se s Odredbama i uvjetima te Pravilima privatnosti"
          //   helperText="Za nastavak je nužno prihvatiti."
        />
        <Button
          className="submit--button"
          onlink="0"
          buttonsize="btn--large"
          buttonstyle="btn--primary"
        >
          NARUČI SE
        </Button>
      </div>
    </form>
  );
}
