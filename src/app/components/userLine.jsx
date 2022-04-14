import React, {useState, useEffect} from 'react';
import User from './user';
import Pagination from './pagination';
import {paginate} from '../utils/paginate';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import API from '../api';
import SearchStatus from './searchStatus';

const UserLine = ({users, ...rest}) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(()=> {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf ? users.filter((user) => {
        return user.profession.name === selectedProf.name;
    }) : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        contentProperty="name"
                        valueProperty="_id"
                        selectedItem={selectedProf}
                    />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus professions={professions} length={users.length}/>

                {count > 0 && (
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
                            {userCrop.map((user) => (
                                <User key={user._id} {...rest} {...user} />
                            ))
                            }
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        clearFilter={clearFilter}
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onToggleBookMark={rest.onToggleBookMark}
                    />
                </div>
            </div>


        </div>
    );
};
UserLine.propTypes = {
    users: PropTypes.array
};
export default UserLine;
