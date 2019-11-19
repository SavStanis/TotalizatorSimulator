import React from 'react';
import './BetEvent.css';

const BetEvent = (props) => {
    return(
        <div className="betEvent">
            <div className="betHeader">{props.data.date}</div>
            <div className="betEventInfo">
                <div className="betEventLabel">Question: {props.data.question}</div>
                <div className="betEventLabel">First answer: {props.data.answer1}</div>
                <div className="betEventLabel">Second answer: {props.data.answer2}</div>
            </div>
        </div>
    )
};

export default BetEvent;