import React from 'react'

export const Message = (props: {
    message: string;
    position: {
        x: string;
        y: string;
        width: string;
    }
}) => {
    return (
        <h1 className="Message" style={{
            top: props.position.y,
            left: props.position.x,
            width: props.position.width
        }}>
            {props.message}
        </h1>
    )
}
