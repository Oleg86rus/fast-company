import React, {useState} from "react";
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleLineDelete = (id) => {
        setUsers(users.filter(user => user._id !== id));
    };

    const getSpanColor = (el) => {
        let classes = 'm-1 badge bg-';
        classes += el.color
        return classes;
    };
    const deleteButton = (user) => {
        return (
            <button type="button"
                    className="btn btn-danger"
                    onClick={() => handleLineDelete(user._id)}
            >
                Удалить
            </button>
        );
    };

    const renderBageText = (number) => {
        const lastLetter = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "Человек тусанёт с тобой сегодня";
        if ([2,3,4].indexOf(lastLetter) >= 0) return 'Человека тусанут с тобой сегодня';
        if (lastLetter === 1) return "Человек тусанёт с тобой сегодня";
        return "Человек тусанёт с тобой сегодня"
    }

    return (
        <>
            <h2>
                <span className={'badge bg-' + (!users.length ? 'danger' : 'primary')}>
                    {
                        users.length ? `${users.length} ${renderBageText(users.length)}` : 'Никто с тобой не тусанет'
                    }
                </span>
            </h2>
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
                {users.map((user) => (
                    <tr key={user._id}>
                        <td className='align-middle'>{user.name}</td>
                        <td className='align-middle'>{user.qualities.map((el) => (
                            <span key={el._id} className={getSpanColor(el)}>{el.name}</span>))}</td>
                        <td className='align-middle'>{user.profession.name}</td>
                        <td className='align-middle'>{user.completedMeetings}</td>
                        <td className='align-middle'>{user.rate}/5</td>
                        <td className='align-middle'>
                            {deleteButton(user)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default Users;