import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import '../../App.css'
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Button } from "@material-ui/core";

const SButton = withStyles({
    root: {
        '&:hover': {
        backgroundColor: '#fff',
        color: '#242424',
        transition: 'all 0.4 ease-out',
        border: '1px solid black',
        },
    },
})(Button);

export default function Contact() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO handle submit
  };
  /* const table_style = {
      padding: '10px',
      fontSize: '20px',
      displey: 'flex',
      maxWidth: '750px',
      textAlign: 'left',
      border: '1px solid black',
      tableLayout: 'fixed',
      witeSpace: 'nowrap',
  }; */
    
    return (
        <form className="contact">
            <div className="form--container">
                <p className="title">Kontaktirajte nas</p>
                <TextField
                    //error={errorName}
                    id="name"
                    variant="outlined"
                    label="Ime"
                    placeholder="Ivan Horvat"
                    required
                    className="container--item"
                    //helperText="Unesite ime."
                    size="small"
                />
                <TextField
                    //error={errorName}
                    id="e_mail"
                    variant="outlined"
                    label="Adresa e-pošte"
                    placeholder="ivan.horvat@mail.com"
                    required
                    className="container--item"
                    //helperText="Unesite ime."
                    size="small"
                />
                <TextareaAutosize
                    aria-label="Dodatni komentar"
                    id="text"
                    rowsMin={5}
                    placeholder="Sadržaj poruke"
                    required
                    className="comment--textarea"
                />
                <SButton
                    type="submit"
                    className="submit--button"
                    onlink="0"
                    onSubmit={handleSubmit}
                    buttonsize="btn--large"
                    buttonstyle="btn--primary"
                >
                POŠALJI
                </SButton>
            </div>
            <div className="form--container">
                <table>
                    <tr>
                        <th rowspan="3"> Vlasnik:</th>
                    <td>Ime: Ivan Horvat</td></tr>
                    <tr><td>Mobitel: +385 98 765 43 21</td></tr>
                    <tr><td>E-mail: ivan.horvat@mail.hr</td></tr>
                </table>
                <table>
                    <tr>
                        <th rowspan="3"> Voditelj poduzeća:</th>
                    <td>Ime: Petar Perić</td></tr>
                    <tr><td>Mobitel: +385 98 123 45 67</td></tr>
                    <tr><td>E-mail: petar.peric@mail.hr</td></tr>
                </table>
            </div>
        </form>
    )
}