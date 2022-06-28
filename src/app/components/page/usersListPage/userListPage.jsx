import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Pagination from '../../common/pagination';
import paginate from '../../../utils/paginate';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import UserTable from '../../ui/usersTable';
import Loading from '../../ui/loading';
import SearchUsers from '../../ui/searchUsers';
import { useUser } from '../../../hooks/useUsers';
import { useAuth } from '../../../hooks/useAuth';
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions';
import { useSelector } from 'react-redux';

function UsersListPage () {
  const { users } = useUser();
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const professions = useSelector(getProfessions());
  const {currentUser} = useAuth();
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [usersFound, setUsersFound] = useState('');
  
  const handleLineFindUser = (e) => {
    setSelectedProf(undefined);
    setUsersFound(e.target.value);
  };
  
  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
  };
  const handleProfessionSelect = (item) => {
    if (usersFound !== "") setUsersFound("");
    setSelectedProf(item);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  
  useEffect(() => {
    setCurrentPage(1);
  },
  [selectedProf, usersFound]);
  function filterUsers(data) {
    const filteredUserList = usersFound ? data.filter(user => {
      return user.name.toLowerCase().includes(usersFound.toLowerCase());
    }) : selectedProf
      ? data.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      ) : data;
    return filteredUserList.filter(u=>u._id !== currentUser._id);
  }
  if (users) {
    const filteredUserList = filterUsers(users);
    const count = filteredUserList.length;
    const sortedUsers = _.orderBy(filteredUserList,
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
          {professions && !professionsLoading && (
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
