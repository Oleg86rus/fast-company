import React from "react";

const Bookmark = (props) => {
    const {changePriority} = props;

    return (
            <i className="bi bi-bookmark" onClick={(event)=> changePriority(event)}/>
    );
};

export default Bookmark;
