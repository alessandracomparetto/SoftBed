import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

function Immagine() {
    const {id, immagine} = useParams();
    const [imgURL, setImgURL] = useState("");

    useEffect(() => {
        fetch(`/uploads/foto/${id}/${immagine}`)
            .then(res => res.blob())
            .then(img => {
                setImgURL(URL.createObjectURL(img));
            })
    }, [])

    return (
        <img src={imgURL} alt={immagine} />
    )

}

export default Immagine;