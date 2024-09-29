import React from "react";
import '../styles/Options.css';

const Options: React.FC = () => {
    return (
        <div className="container10">
            <h4>Sort by</h4>
            <div className="optionGroup">
                <label>
                    <input type="radio" name="sort" />
                    Earliest departure time
                </label>
                <label>
                    <input type="radio" name="sort" />
                    Lowest price
                </label>
                <label>
                    <input type="radio" name="sort" />
                    Close to destination
                </label>
                <label>
                    <input type="radio" name="sort" />
                    Close to departure point
                </label>
                <label>
                    <input type="radio" name="sort" />
                    Shortest trip
                </label>
            </div>
            <h4>Departure time</h4>
            <div className="optionGroup">
                <label>
                    <input type="checkbox" />
                    06:00 - 12:00
                </label>
                <label>
                    <input type="checkbox" />
                    12:01 - 18:00
                </label>
                <label>
                    <input type="checkbox" />
                    After 18:00
                </label>
            </div>
            <h4>Conveniences</h4>
            <div className="optionGroup">
                <label>
                    <input type="checkbox" />
                    Wi-fi
                </label>
                <label>
                    <input type="checkbox" />
                    Electronic tickets
                </label>
                <label>
                    <input type="checkbox" />
                    Air conditioning
                </label>
            </div>
        </div>
    );
};

export default Options;
