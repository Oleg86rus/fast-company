import React, {useState} from "react";
import UserLine from "./components/userLine";
import api from "../api";
import SearchStatus from "./components/searchStatus"


const App = () => {
    const usersList = api.users.fetchAll();

    const [users, setUsers] = useState(usersList);

    const handleLineDelete = (id) => {
        setUsers(users.filter(user => user._id !== id));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        )
    }
    return (
        <div>
            <SearchStatus length={users.length} />
            <UserLine onDelete={handleLineDelete} onToggleBookMark={handleToggleBookMark} users={users} />
        </div>
    );
};

export default App;