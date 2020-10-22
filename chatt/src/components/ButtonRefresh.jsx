import React from 'react'

export default function ButtonRefresh(props) {
    return (
        <div>
            <button onClick={props.handleOnClick} className='btn btn-secondary'>Refresh</button>

        </div>
    )
}
