import React, { useState, useEffect } from "react";
import "./details.css";
import GetData from "../../services/get-data";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error-message/error-message";




const SpeciesDetails = ({ itemId }) => {

    const [species, SetSpecies] = useState(null);
    const [error, SetError] = useState(false);
    const [loading, SetLoading] = useState(true);


    useEffect(() => {
        const data = new GetData();

        data.getSpecies(itemId)
            .then((species) => {
                SetSpecies(species);
                SetLoading(false);
            })
            .catch(() => { SetError(true) });
    }, [itemId]);



    if (error) {
        return (<ErrorMessage />);
    };

    if (loading || !species) {
        return <Spinner />
    };

    const { name, classification, designation, hair_colors, skin_colors,
        eye_colors, average_height, average_lifespan } = species;


    return (
        <div className="SpeciesDetails bgColor rounded d-flex mb-4">
            <img className="img-fluid rounded m-3"
                src={`https://starwars-visualguide.com/assets/img/species/${itemId}.jpg`}
                alt="Species">
            </img>
            <ul className="m-3 pl-0">
                <h4>{name}</h4>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Classification:</span> {classification}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Designation:</span> {designation}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Hair colors:</span> {hair_colors}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Skin colors:</span> {skin_colors}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Eye colors:</span> {eye_colors}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Average height:</span> {average_height} cm
                    </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Average lifespan:</span> {average_lifespan} years
                    </li>
            </ul>
        </div>
    );
};


export default SpeciesDetails;