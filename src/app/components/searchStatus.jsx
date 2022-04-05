import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({length}) => {
    const renderBageText = (number) => {
        const lastLetter = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return 'Человек тусанёт';
        if ([2, 3, 4].indexOf(lastLetter) >= 0) return 'Человека тусанут';
        if (lastLetter === 1) return 'Человек тусанёт';
        return 'Человек тусанёт';
    };

    return (
        <h2>
            <span className={'badge ' + (length > 0 ? 'bg-primary' : 'bg-danger')}>
                {length > 0 ?
                    `${length + ' ' + renderBageText(length)}   с тобой сегодня` :
                    'Никто с тобой не тусанет'}
            </span>
        </h2>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired,
};
export default SearchStatus;
