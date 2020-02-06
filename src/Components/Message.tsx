import React from 'react'

export const Message = (props: {
    message: string;
    position: {
        x: string;
        y: string;
    }
}) => {
    return (
        <h1 className="Message" style={{
            top: props.position.y,
            left: props.position.x,
            width: '100%'
        }}>
            {props.message}
        </h1>
    )
}
