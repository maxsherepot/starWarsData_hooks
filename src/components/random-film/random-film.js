import React, { useState, useEffect } from "react";
import "./random-film.css";
import GetData from "../../services/get-data";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error-message/error-message";



const RandomFilm = () => {

    const [error, setError] = useState(false);
    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);
    const [director, setDirector] = useState(null);
    const [producer, setProducer] = useState(null);
    const [release_date, setRelease_date] = useState(null);




    useEffect((id) => {
        const data = new GetData();
        const number = Math.floor(Math.random() * 6) + 1;

        data.getFilm(number)
            .then((film) => {
                setId(film.episode_id - 3)
                setTitle(film.title)
                setDirector(film.director)
                setProducer(film.producer)
                setRelease_date(film.release_date)

                if (number > 3) {
                    setId(film.episode_id + 3)
                }

                if (id === 10) {
                    setId(7)
                }
            })
            .catch(() => { setError(true) });
    }, [])



    if (error) {
        return <ErrorMessage />;
    };

    if (!id) {
        return (
            <div className="bgColor rounded mb-4 py-5 d-flex justify-content-center">
                <Spinner />
            </div>
        );
    };


    return (
        <div className="RandomFilm bgColor rounded d-flex mb-4" >
            <img className="img-fluid rounded m-3"
                src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`}
                alt="Film" >
            </img>
            <ul className="m-3 pl-0">
                <h4>{title}</h4>
                <li className="mb-1 mt-4">
                    <span className="font-weight-bold mr-2">Director:</span> {director}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Producer:</span> {producer}
                </li>
                <li className="mb-1">
                    <span className="font-weight-bold mr-2">Release date:</span> {release_date}
                </li>
            </ul>
        </div>
    );
};


export default RandomFilm;