import React from 'react';
import './Button.css';

const Button = ({children}) => {
    return (
        <input className="button" type="button" value={children}/>
    );
};

export default Button;