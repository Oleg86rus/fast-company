import React, {useState} from "react";
import User from "./user";

const Users = (props) => {
    console.log(props.length)
    // const usersList = api.users.fetchAll()
    // const [users, setUsers] = useState(usersList);
    // const handleLineDelete = (id) => {
    //     setUsers(users.filter(user => user._id !== id));
    // };
    //
    // const getSpanColor = (el) => {
    //     let classes = 'm-1 badge bg-';
    //     classes += el.color
    //     return classes;
    // };
    //
    // const renderBageText = (number) => {
    //     const lastLetter = Number(number.toString().slice(-1));
    //     if (number > 4 && number < 15) return "Человек тусанёт";
    //     if ([2,3,4].indexOf(lastLetter) >= 0) return 'Человека тусанут';
    //     if (lastLetter === 1) return "Человек тусанёт";
    //     return "Человек тусанёт"
    // }

    return (
            // {props.length > 0 &&
            (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {props.map((user) => (
                    <User
                        key={user._id}
                        onDelete={props.handleLineDelete}
                        getSpanColor={props.getSpanColor}
                        {...user}
                    >

                    </User>

                ))}
                </tbody>

            </table>
            // )}
    ))
};

export default Users;