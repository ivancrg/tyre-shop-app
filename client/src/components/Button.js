import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

//arrays with css classes
const STYLES = ["btn--primary", "btn--outline", "btn--primary--gray"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onclick,
  buttonstyle,
  buttonsize,
  linkpath,
  linkon,
}) => {
  const checkButtonStyle = STYLES.includes(buttonstyle)
    ? buttonstyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonsize) ? buttonsize : SIZES[0];

  if (linkon) {
    return (
      <Link to={linkpath} className="btn-mobile">
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={onclick}
          type={type}
        >
          {children}
          {/*kada stvorimo element Button, sav sadržaj se prosljeđuje ovdje kao children (npr. tekst Buttona) */}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onclick}
        type={type}
      >
        {children}
        {/*kada stvorimo element Button, sav sadržaj se prosljeđuje ovdje kao children (npr. tekst Buttona) */}
      </button>
    );
  }
};
