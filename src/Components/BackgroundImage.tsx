import React, { CSSProperties, useEffect } from 'react'

export const BackgroundImage = (props: {
    blur: boolean;
}) => {
    const imageStyle: CSSProperties = {
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        position: 'absolute',
        transform: props.blur ? 'scale(1.1)' : 'none',
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundImage: 'url(https://source.unsplash.com/1920x1080/?mountains)',
        filter: props.blur ? 'blur(8px)' : 'none'
    };

    return (
        <div style={imageStyle}>
            
        </div>
    )
}
