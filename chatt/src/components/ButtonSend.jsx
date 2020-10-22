import React from 'react'

export default function ButtonSend(props) {
    return (
        <button onClick={props.handleSendMessage} className='btn btn-primary'>
        Send message
    </button>
    )
}
