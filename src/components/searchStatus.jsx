import React from "react";

const SearchStatus = (props) => {
    const {length, renderBageText} = props;

    return (
        <div>
            <h2>
            <span className={'badge bg-' + (length === 0 ? 'danger' : 'primary')}>
                {
                    length > 0 ? `${length} ${renderBageText(length)} с тобой сегодня` : 'Никто с тобой не тусанет'
                }
            </span>
            </h2>
        </div>
    );
};

export default SearchStatus;