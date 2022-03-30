import React, {useState} from "react";
import UserLine from "./components/userLine";
import api from "./api";

const App = () => {
    const usersList = api.users.fetchAll();

    const [users, setUsers] = useState(usersList);

    const handleLineDelete = (id) => {
        setUsers(users.filter(user => user._id !== id));
    };

    const getSpanColor = (el) => {
        let classes = 'm-1 badge bg-';
        classes += el.color;
        return classes;
    };

    const handleClickBookmark = (event) => {
        const {target} = event;
        if (target.className !== 'bi bi-bookmark-star-fill') {
            target.className = 'bi bi-bookmark-star-fill';
        } else {
            target.className = "bi bi-bookmark";
        }
    };

    const renderBageText = (number) => {
        const lastLetter = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "Человек тусанёт";
        if ([2,3,4].indexOf(lastLetter) >= 0) return 'Человека тусанут';
        if (lastLetter === 1) return "Человек тусанёт";
        return "Человек тусанёт";
    };

    return (
        <>
            <UserLine
                renderBageText={renderBageText}
                handleLineDelete={handleLineDelete}
                getSpanColor={getSpanColor}
                length={users.length}
                users={[...users]}
                changePriority={handleClickBookmark}
                {...users}
            />
        </>
    );
};

export default App;