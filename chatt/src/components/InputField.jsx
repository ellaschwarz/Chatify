import React from 'react'

export default function InputField(props) {
    return (
        <div className='form-group'>
        <label>{props.label}</label>
        <input
            ref={props.myRef}
            className='form-control'
            placeholder={props.placeholder}
        ></input>
    </div>
    )
}
