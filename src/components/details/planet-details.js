import React, { useState, useEffect } from "react";
import "./details.css";
import GetData from "../../services/get-data";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error-message/error-message";




const PlanetDetails = ({ itemId }) => {

    const [planet, SetPlanet] = useState(null);
    const [error, SetError] = useState(false);
    const [loading, SetLoading] = useState(true);


    useEffect(() => {
        const data = new GetData();

        data.getPlanet(itemId)
            .then((planet) => {
                SetPlanet(planet);
                SetLoading(false);
            })
            .catch(() => { SetError(true) });
    }, [itemId]);



    if (error) {
        return (<ErrorMessage />);
    };

    if (loading || !planet) {
        return <Spinner />
    };

    const { name, rotation_period, orbital_period, diameter, climate,
        gravity, terrain, population } = planet;


    return (
        <div className="PlanetDetails bgColor rounded d-flex mb-4">
            <img className="img-fluid rounded m-3"
                src={`https://starwars-visualguide.com/assets/img/planets/${itemId}.jpg`}
                alt="Planet">
            </img>
            <ul className="m-3 pl-0">
                <h4>{name}</h4>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Rotation period:</span> {rotation_period} days
                    </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Orbital period:</span> {orbital_period} days
                    </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Diameter:</span> {diameter} km
                    </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Climate:</span> {climate}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Gravity:</span> {gravity}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Terrain:</span> {terrain}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Population:</span> {population}
                </li>
            </ul>
        </div>
    );
};


export default PlanetDetails;


