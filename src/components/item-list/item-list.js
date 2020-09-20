import React, { useState, useEffect } from "react";
import Spinner from "../spinner/spinner";
import "./item-list.css";
import ErrorMessage from "../error-message/error-message";




const ItemList = ({ getData, onItemSelected }) => {

    const [itemList, setItemList] = useState(null);
    const [error, setError] = useState(false);


    useEffect(() => {
        getData()
            .then((itemList) => setItemList(itemList))
            .catch(() => setError(true));
    }, [getData])


    const renderName = (arr) => {
        return arr.map((item) => {
            const idRegExp = /\/([0-9]*)\/$/;
            const id = item.url.match(idRegExp)[1];
            return (
                <li className="list-group-item bgColor"
                    key={item.name}
                    onClick={() => onItemSelected(id)}>
                    {item.name}</li>
            );
        });
    };


    if (error) {
        return <ErrorMessage />
    };

    if (!itemList) {
        return <Spinner />
    };

    const element = renderName(itemList);
    
    
    
    return (
        <ul className="Item-List list-group mb-4">
            {element}
        </ul>
    );
};


export default ItemList;