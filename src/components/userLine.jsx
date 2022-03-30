import React, {useState} from "react";
import User from "./user";
import SearchStatus from "./searchStatus";

const UserLine = (props) => {

    return (
        <>
            <SearchStatus
                length={props.length}
                renderBageText={props.renderBageText}
            />
            {props.length > 0 &&
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.users.map((user) => (
                        <User
                            key={user._id}
                            renderBageText={props.renderBageText}
                            onDelete={props.handleLineDelete}
                            getSpanColor={props.getSpanColor}
                            changePriority={props.changePriority}
                            {...user}
                        >
                        </User>
                    ))}
                    </tbody>
                </table>
            }
        </>
    )
};

export default UserLine;