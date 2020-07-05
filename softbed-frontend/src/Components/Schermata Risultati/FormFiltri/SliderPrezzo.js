import React, {Fragment, useState} from 'react';
import Slider from '@material-ui/core/Slider';


function valuetext(value) {
    return `${value}€`;
}

function SliderPrezzo(props) {

    const [value, setValue] = useState([props.minimo, props.massimo]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const quarto = (props.massimo - props.minimo) / 4;
    const marks = [
        {
            value: `${Math.round(props.minimo)}`,
            label: `${Math.round(props.minimo)}€`
        },
        {
            value: `${Math.round(props.minimo + quarto)}`,
            label: `${Math.round(props.minimo + quarto)}€`,
        },
        {
            value: `${Math.round(props.minimo + quarto * 2)}`,
            label: `${Math.round(props.minimo + quarto * 2)}€`,
        },
        {
            value: `${Math.round(props.minimo + quarto * 3)}`,
            label: `${Math.round(props.minimo + quarto * 3)}€`,
        },
        {
            value: `${Math.round(props.massimo)}`,
            label: `> ${Math.round(props.massimo)}€`,
        },
    ];

    return (
        <Fragment>
            <input id="prezzoMinimo" name="prezzoMinimo" type="number" className="d-none" value={value[0]} readOnly/>
            <input id="prezzoMassimo" name="prezzoMassimo" type="number" className="d-none" value={value[1]} readOnly/>
            <Slider
                min={props.minimo}
                max={props.massimo}
                value={value}
                onChange={handleChange}
                step={10}
                marks={marks}
                valueLabelDisplay="auto"
                aria-labelledby="slider-prezzo"
                getAriaValueText={valuetext}
            />
        </Fragment>
    );
}

export default SliderPrezzo;