import React from "react";
import "../../App.css";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useForm, Controller } from "react-hook-form";

export default function App() {
  const { /*register,*/ handleSubmit, /*watch,*/ errors, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    Axios.post("http://localhost:3001/api/insertAppointment", {
      buyer_name: data["first_name"],
      buyer_surname: data["last_name"],
      offer_code: data["offer_code"],
      quantity: data["quantity"],
      e_mail: data["email"],
      phone_no: data["phone"],
      comments: data["comment"],
      tyre_dimension:
        data["tyre_width"] +
        "/" +
        data["tyre_height"] +
        "/" +
        data["tyre_diameter"],
    });
  };

  // React.useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  return (
    <form className="appointment" onSubmit={handleSubmit(onSubmit)}>
      <div className="form--container">
        <p className="title">Osobni podaci</p>
        <Controller
          name="first_name"
          control={control}
          defaultValue=""
          render={({ onChange, value, ref }) => (
            <TextField
              id="name"
              variant="outlined"
              label="Ime"
              placeholder="Ivan"
              className="container--item"
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
          name="phone"
          control={control}
          defaultValue=""
          render={({ onChange, value, ref }) => (
            <TextField
              variant="outlined"
              id="phone_no"
              label="Telefon/mobitel"
              placeholder="0912345678"
              className="container--item"
              size="small"
              value={value}
              onChange={onChange}
              inputRef={ref}
              error={!!errors.phone}
              helperText={errors?.phone?.message || ""}
            />
          )}
          rules={{
            required: "Obavezno polje",
            pattern: {
              value: /^[0-9+\-/ ]+$/i,
              message: "Unesite broj telefona/mobitela.",
            },
          }}
        />
      </div>

      <div className="form--container">
        <p className="title">Podaci vezani za narudžbu</p>
        <Controller
          name="offer_code"
          control={control}
          defaultValue=""
          render={({ onChange, value, ref }) => (
            <TextField
              variant="outlined"
              id="offer_code"
              label="Šifra proizvoda"
              placeholder="1234567"
              className="container--item"
              size="small"
              value={value}
              onChange={onChange}
              inputRef={ref}
              error={!!errors.offer_code}
              helperText={errors?.offer_code?.message || ""}
            />
          )}
          rules={{
            required: "Obavezno polje",
            pattern: {
              value: /^[0-9]+$/i,
              message: "Unesite šifru proizvoda.",
            },
          }}
        />

        <Controller
          name="quantity"
          control={control}
          defaultValue=""
          render={({ onChange, value, ref }) => (
            <TextField
              variant="outlined"
              id="quantity"
              label="Količina"
              placeholder="4"
              className="container--item"
              size="small"
              value={value}
              onChange={onChange}
              inputRef={ref}
              error={!!errors.quantity}
              helperText={errors?.quantity?.message || ""}
            />
          )}
          rules={{
            required: "Obavezno polje",
            pattern: {
              value: /^[0-9]+$/i,
              message: "Unesite količinu.",
            },
          }}
        />

        <div className="container--item--tyre--dimensions">
          <Controller
            name="tyre_width"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <FormControl
                variant="outlined"
                className="dimensions--item"
                size="small"
              >
                <InputLabel id="tyre-width-select-label">
                  Širina gume
                </InputLabel>
                <Select
                  labelId="tyre-width-select-label"
                  id="tyre-width-select"
                  label="Širina gume"
                  value={value}
                  onChange={onChange}
                  inputRef={ref}
                  error={!!errors.tyre_width}
                >
                  <MenuItem value={135}>135</MenuItem>
                  <MenuItem value={145}>145</MenuItem>
                  <MenuItem value={155}>155</MenuItem>
                  <MenuItem value={165}>165</MenuItem>
                  <MenuItem value={175}>175</MenuItem>
                  <MenuItem value={185}>185</MenuItem>
                  <MenuItem value={195}>195</MenuItem>
                  <MenuItem value={205}>205</MenuItem>
                  <MenuItem value={215}>215</MenuItem>
                  <MenuItem value={225}>225</MenuItem>
                  <MenuItem value={235}>235</MenuItem>
                  <MenuItem value={245}>245</MenuItem>
                  <MenuItem value={255}>255</MenuItem>
                  <MenuItem value={265}>265</MenuItem>
                  <MenuItem value={275}>275</MenuItem>
                  <MenuItem value={285}>285</MenuItem>
                  <MenuItem value={295}>295</MenuItem>
                </Select>
              </FormControl>
            )}
            rules={{
              required: true,
            }}
          />

          <Controller
            name="tyre_height"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <FormControl
                variant="outlined"
                className="dimensions--item"
                size="small"
              >
                <InputLabel id="tyre-height-select-label">
                  Visina gume
                </InputLabel>
                <Select
                  labelId="tyre-height-select-label"
                  id="tyre-height-select"
                  label="Visina gume"
                  defaultValue=""
                  value={value}
                  onChange={onChange}
                  inputRef={ref}
                  error={!!errors.tyre_height}
                >
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={35}>35</MenuItem>
                  <MenuItem value={40}>40</MenuItem>
                  <MenuItem value={45}>45</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={55}>55</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                  <MenuItem value={65}>65</MenuItem>
                  <MenuItem value={70}>70</MenuItem>
                  <MenuItem value={75}>75</MenuItem>
                  <MenuItem value={80}>80</MenuItem>
                </Select>
              </FormControl>
            )}
            rules={{
              required: true,
            }}
          />

          <Controller
            name="tyre_diameter"
            control={control}
            defaultValue=""
            render={({ onChange, value, ref }) => (
              <FormControl
                variant="outlined"
                className="dimensions--item"
                size="small"
              >
                <InputLabel id="tyre-diameter-select-label">
                  Promjer gume (")
                </InputLabel>
                <Select
                  labelId="tyre-diameter-select-label"
                  id="tyre-diameter-select"
                  label={'Promjer gume (")'}
                  defaultValue=""
                  value={value}
                  onChange={onChange}
                  inputRef={ref}
                  error={!!errors.tyre_diameter}
                >
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={13}>13</MenuItem>
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={17}>17</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={19}>19</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={21}>21</MenuItem>
                  <MenuItem value={22}>22</MenuItem>
                </Select>
              </FormControl>
            )}
            rules={{
              required: true,
            }}
          />
        </div>

        <Controller
          name="comment"
          control={control}
          defaultValue=""
          render={({ onChange, value, ref }) => (
            <TextareaAutosize
              aria-label="Dodatni komentar"
              id="comment"
              rowsMin={5}
              placeholder="  Komentar..."
              className="comment--textarea"
              value={value}
              onChange={onChange}
              inputref={ref}
            />
          )}
          rules={{
            required: false,
          }}
        />
      </div>

      <div className="form--container">
        <Controller
          name="terms_conditions"
          control={control}
          defaultValue={false}
          rules={{ required: true }}
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
          NARUČI SE
        </Button>
      </div>
    </form>
  );
}
