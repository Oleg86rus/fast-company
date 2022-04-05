import React from 'react';
import Qualities from './qualities';
import Bookmark from './bookmark';
import PropTypes from 'prop-types';

const User = (props) => {
    const {
        _id,
        name,
        qualities,
        profession,
        completedMeetings,
        rate,
        onDelete,
        bookmark,
        onToggleBookMark,
    } = props;

    const deleteButton = () => {
        return (
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(_id)}
            >Удалить
            </button>
        );
    };

    return (
        <>
            <tr key={_id}>
                <td>{name}</td>
                <td>
                    {qualities.map((quality) => (
                        <Qualities key={quality._id} _id={quality._id} {...quality} />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}/5</td>
                <td>
                    <Bookmark status={bookmark} onClick={() => onToggleBookMark(_id)}/>
                </td>
                <td>{deleteButton()}</td>
            </tr>
        </>
    );
};
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
};
export default User;
