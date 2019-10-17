import React from 'react';
import './Button.css';

const Button = ({children}) => {
    return (
        <input className="button" type="Submit" value={children}/>
    );
};

export default Button;