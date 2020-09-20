import React, { useState, useEffect } from "react";
import "./details.css";
import GetData from "../../services/get-data";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error-message/error-message";



const PersonDetails = ({ itemId }) => {

    const [person, SetPerson] = useState(null);
    const [error, SetError] = useState(false);
    const [loading, SetLoading] = useState(true);


    useEffect(() => {
        const data = new GetData();

        data.getPerson(itemId)
            .then((person) => {
                SetPerson(person);
                SetLoading(false);
            })
            .catch(() => { SetError(true) });
    },[itemId]);



    if (error) {
        return (<ErrorMessage />);
    };

    if (loading || !person) {
        return <Spinner />
    };

    const { name, gender, height, hair_color, skin_color,
        eye_color } = person;

        
    return (
        <div className="PersonDetails bgColor rounded d-flex mb-4">
            <img className="img-fluid rounded m-3"
                src={`https://starwars-visualguide.com/assets/img/characters/${itemId}.jpg`}
                alt="Person">
            </img>
            <ul className="m-3 pl-0">
                <h4>{name}</h4>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Gender:</span> {gender}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Height:</span> {height} cm
                    </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Hair color:</span> {hair_color}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Skin color:</span> {skin_color}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Eye color:</span> {eye_color}
                </li>
            </ul>
        </div>
    );
};


export default PersonDetails;