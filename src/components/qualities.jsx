import React from "react";

const Qualities = (props) => {
    const {_id, getSpanColor, name} = props;

    return (
        <>
               <span key={_id} className={getSpanColor(props)}>{name}</span>
        </>
    );
};

export default Qualities;