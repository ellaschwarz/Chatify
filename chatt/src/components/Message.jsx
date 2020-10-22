import React from 'react'

export default function Message(props) {
    return (
        <div className='col-md-12'>
        <div className='alert alert-info'>
            {props.message} - {props.name}
        </div>
    </div>
    )
}
