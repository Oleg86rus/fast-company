import React, {useEffect, useState} from 'react';
import UserLine from './components/userLine';
import API from './api';
import {loading} from './utils/loading';

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll());
    useEffect(()=>{
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleLineDelete = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return {...user, bookmark: !user.bookmark};
                }
                return user;
            })
        );
    };
    loading();
    return (
        <div>
            <UserLine
                onDelete={handleLineDelete}
                onToggleBookMark={handleToggleBookMark}
                users={Object.values(users)}
            />
        </div>
    );
};

export default App;
