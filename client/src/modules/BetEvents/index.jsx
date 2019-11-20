import React from 'react';
import axios from "axios";

import {BetEvent} from "../../components";
import {API_URL} from "../../config";

class BetEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: []
        };
    }

    componentDidMount() {
        axios.get(`${API_URL}/event/get-events`)
            .then((response) => {
                if(response.status === 200) {
                    this.setState({
                        eventList: response.data
                    })
                }
            })
    }
    render() {
        return (
            <div className="betEvents">
                {
                    this.state.eventList.map((event, i) => {
                        return (
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
        )
    }
}

export default BetEvents;