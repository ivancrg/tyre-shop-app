import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom'

//arrays with css classes
const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return(
        <Link to="/Login" className='btn-mobile'>
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}    
            >
                {children}
                {/*kada stvorimo element Button, sav sadržaj se prosljeđuje ovdje kao children (npr. tekst Buttona) */}
            </button>
        </Link>
    );
};