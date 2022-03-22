import React, {useState} from "react";
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(Object.entries(api.users.fetchAll()));
    const handleLineDelete = (id) => {
        setUsers(prevState => prevState.filter(user => user !== id));
    };
    const numberOfPeople = () => {
        const a = `${users.length} человек тусанет с тобой сегодня`;
        const b = `${users.length} человека тусанут с тобой сегодня`;
        const c = `Никто с тобой не тусанет`;
        switch (users.length) {
            case 12:
            case 11:
            case 10:
            case 9:
            case 8:
            case 7:
            case 6:
            case 5:
            case 1:
                return a;
            case 2:
            case 3:
            case 4:
                return b;
            case 0:
                return c;
            default:
                return c;
        }
    };
    const getBageClasses = () => {
        let classes = 'badge m-2 ';
        classes += users.length === 0 ? 'bg-danger' : 'bg-primary';
        return classes;
    };
    const getSpanColor = (el) => {
        let classes = 'p-1 m-1 badge align-middle bg-';
        classes += el.color
        return classes;
    };
    const deleteButton = (user) => {
        return (
            <button type="button"
                    className="btn btn-danger"
                    onClick={() => handleLineDelete(user)}
            >
                delete
            </button>
        );
    };
    const renderBage = () => {
        return (
            <h2><span className={getBageClasses()}>{numberOfPeople()}</span></h2>
        );
    };
    const renderTable = () => {
        return (
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
                {users.map((user, id) => (
                    <tr key={id}>
                        <td className='align-middle'>{user[1].name}</td>
                        <td className='align-middle'>{user[1].qualities.map((el, id) => (
                            <span key={id} className={getSpanColor(el)}>{el.name}</span>))}</td>
                        <td className='align-middle'>{user[1].profession.name}</td>
                        <td className='align-middle'>{user[1].completedMeetings}</td>
                        <td className='align-middle'>{user[1].rate}/5</td>
                        <td className='align-middle'>
                            {deleteButton(user)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    if (users.length !== 0) {
        return (
            <>
                {renderBage()}
                {renderTable()}
            </>
        );
    }

    return (
        <>
            {renderBage()}
        </>
    );
};

export default Users;