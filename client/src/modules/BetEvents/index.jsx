import React from 'react';
import {BetEvent} from "../BetEvent";

const BetEvents = (props) => {
    return (
        <div className="betEvents">
            {
                props.data.map((event, i) => {
                    return(
                        <BetEvent
                            key={i}
                            date={event.date}
                            question={event.question}
                            answer1={event.answer1}
                            coefficient1={event.coefficient1}
                            answer2={event.answer2}
                            coefficient2={event.coefficient2}
                            eventID={event.eventID}
                        />
                    )
                })
            }
        </div>
    )};

export default BetEvents;