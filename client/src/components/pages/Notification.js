import React, { useState } from 'react'
import '../../App.css'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/select";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, FormLabel, Radio, RadioGroup } from "@material-ui/core";

export default function Notification() {
    const [errorReceipt, setErrorReceipt] = useState(false);
    const [errorOption, setErrorOption] = useState(false);
    const [notificationOption, setnotificationOption] = useState('');
    const [radioValue, setRadioValue] = useState(false)
  
    const handleChange = (event) => {
      setnotificationOption(event.target.value);
    };

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    return (
        <form className="notification">
            <div className="form--container">
                <p className="title">Podaci za kontakt</p>
                <TextField
                    error={errorReceipt}
                    id="receipt_number"
                    variant="outlined"
                    required
                    label="Broj računa"
                    placeholder="12345/1234/123"
                    className="container--item"
                    //   helperText="Unesite ime."
                    size="small"
                />
                <FormControl required className="container--item">
                    <InputLabel id="notification">Obavijest putem</InputLabel>
                    <Select
                        error={errorOption}
                        labelId="notification"
                        id="notification_method"
                        value={notificationOption}
                        onChange={handleChange}
                    >
                        <MenuItem value="e-mail">E-mail</MenuItem>
                        <MenuItem value="SMS">SMS poruka</MenuItem>
                        <MenuItem value="call">Telefonski poziv</MenuItem>
                    </Select>
                </FormControl>
                <FormControl required className="container--item">
                    <RadioGroup defaultValue="30_min" onChange={handleRadioChange}>
                        <FormControlLabel value="10_min" control={<Radio />} label="10 minuta prije" />
                        <FormControlLabel value="30_min" control={<Radio />} label="30 minuta prije" />
                        <FormControlLabel value="every_10_min" control={<Radio />} label="Svakih 30 minuta" />
                        <FormControlLabel value="every_hour" control={<Radio />} label="Svakih sat vremena" />
                    </RadioGroup>
                </FormControl>
            </div>

            <div className="form--container">
                <Button
                    className="submit--button"
                    onlink="0"
                    buttonsize="btn--large"
                    buttonstyle="btn--primary"
                >
                    OBAVIJESTI ME
                </Button>
            </div>
        </form>
    )
}