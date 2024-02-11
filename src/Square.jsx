import React from 'react';
// קומפוננטה שמציירת משבצת אחת

function Square(props) {
    return (
        <div style={{ backgroundColor: props.color, width: props.width, height: props.height }}></div>
    );
}

export default Square;
