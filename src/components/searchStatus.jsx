import React from "react";

const SearchStatus = (props) => {

    return (
        <div>
            <h2>
            <span className={'badge bg-' + (props.length === 0 ? 'danger' : 'primary')}>
                {
                    props.length > 0 ? `${props.length} ${props.renderBageText(props.length)} с тобой сегодня` : 'Никто с тобой не тусанет'
                }
            </span>
            </h2>
        </div>

    )
}

export default SearchStatus;