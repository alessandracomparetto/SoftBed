import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

function Immagine() {
    const {immagine} = useParams();
    const [imgURL, setImgURL] = useState("");

    useEffect(() => {
        fetch(`/uploads/foto/${immagine}`)
            .then(res => res.blob())
            .then(img => {
                setImgURL(URL.createObjectURL(img));
            })
    }, [immagine]);

    return (
        <img src={imgURL} alt={immagine} />
    )

}

export default Immagine;