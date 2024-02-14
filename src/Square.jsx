import React from 'react';

function Square(props) {
    return (
        <div
            style={{ backgroundColor: props.color, width: props.width, height: props.height }}>
        </div>
    );
}

export default Square;
