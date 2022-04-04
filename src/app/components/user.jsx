import React from "react";
import Qualities from "./qualities";
import Bookmark from "./bookmark";

const User = (props) => {
    const {_id,
        name,
        qualities,
        profession,
        completedMeetings,
        rate,
        onDelete,
        bookmark,
        onToggleBookMark,} = props

    const deleteButton = () => {

        return (
            <button type="button"
                    className="btn btn-danger"
                    onClick={()=> onDelete(_id)}
            >
                Удалить
            </button>
        );
    };

    return (
        <>
            <tr key={_id}>
                <td>{name}</td>
                <td>
                    {qualities.map((quality) => (
                        <Qualities
                            key={quality._id}
                            {...quality}
                        />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}/5</td>
                <td>
                    <Bookmark
                        status={bookmark}
                        onClick={() => onToggleBookMark(_id)}
                    />
                </td>
                <td>
                    {deleteButton()}
                </td>
            </tr>
        </>
    );
};

export default User;