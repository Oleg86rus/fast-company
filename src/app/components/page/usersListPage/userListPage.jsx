import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Pagination from '../../common/pagination';
import paginate from '../../../utils/paginate';
import GroupList from '../../common/groupList';
import API from '../../../api';
import SearchStatus from '../../ui/searchStatus';
import UserTable from '../../ui/usersTable';
import Loading from '../../ui/loading';
import SearchUsers from '../../ui/searchUsers';

function UsersListPage () {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [users, setUsers] = useState();
  const [usersFound, setUsersFound] = useState('');
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  },
  []);

  const handleLineDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };
  
  const handleLineFindUser = (e) => {
    setSelectedProf();
    setUsersFound(e.target.value);
  };
  
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
  },
  []);
  
  useEffect(() => {
    setCurrentPage(1);
  },
  [selectedProf]);

  if (users) {
    const filteredUserList = users.filter(user => {
      return user.name.toLowerCase().includes(usersFound.toLowerCase());
    });
    const filteredUsers = selectedProf
      ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
      : filteredUserList;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers,
      [sortBy.path],
      [sortBy.order]);
    const userCrop = paginate(sortedUsers,
      currentPage,
      pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <>
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
              <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
              </button>
            </div>
          )}
          <div className="d-flex flex-column">
            <SearchStatus professions={professions} length={count}/>
            {users.length ? <SearchUsers userName={usersFound} handleChange={handleLineFindUser}/> : null}
            {count > 0 && (
              <UserTable
                users={userCrop}
                selectedSort={sortBy}
                onSort={handleSort}
                onDelete={handleLineDelete}
                onToggleBookMark={handleToggleBookMark}
              />
            )}
            <div className="d-flex justify-content-center">
              <Pagination
                clearFilter={clearFilter}
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onToggleBookMark={handleToggleBookMark}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return <Loading/>;
}

UsersListPage.propTypes = {
  users: PropTypes.array
};
export default UsersListPage;
