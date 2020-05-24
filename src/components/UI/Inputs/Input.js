import React from 'react';
import './Input.css'

const Input = (props) => {

    let inputElement = null;

    switch (props.elementType) {
        case ('input'): inputElement = <input className="InputElement"
            {...props.elementConfig}
            value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'): inputElement = <textarea className="InputElement"
            {...props.elementConfig} onChange={props.changed}/>;
            break;
        case ('select'):
            let options = [];
            props.elementConfig.options.forEach(opt => { options.push(<option key={opt.value} value={opt.value}>{opt.displayValue}</option>) })
            inputElement = <select  className="InputElement" value={props.value} name="select"onChange={props.changed}>{options}</select>;
            break;
        default: inputElement = <input className="InputElement"
            {...props.elementConfig}
            value={props.value} onChange={props.changed}/>
    };

    return (
        <div className='Input'>
            <label className="Label" htmlFor={props.name}>{props.label}</label>
            {inputElement}
        </div>

    );
};

export default Input;