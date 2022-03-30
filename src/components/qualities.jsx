import React from "react";

const Qualities = (props) => {

    return (
        <>
               <span key={props._id} className={props.getSpanColor(props)}>{props.name}</span>
        </>
    )
}
export default Qualities;