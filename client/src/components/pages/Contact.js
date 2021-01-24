import React from "react";
import Axios from "axios";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function Contact() {
  const { /*register,*/ handleSubmit, /*watch,*/ errors, control } = useForm();

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
          alert("Poruka uspješno poslana.");
        } else {
          alert("Došlo je do greške.");
        }
      }
    );
  };

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
    </>
  );
}
