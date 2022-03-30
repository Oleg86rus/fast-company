import React from "react";

const Bookmark = (props) => {
    return (
            <i className="bi bi-bookmark" onClick={(event)=> props.changePriority(event)}/>
    )
}

export default Bookmark;
