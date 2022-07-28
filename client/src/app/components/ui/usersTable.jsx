import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from '../common/bookmark';
import Qualities from './qualities';
import { Link } from 'react-router-dom';
import Table, { TableBody, TableHeader } from '../common/table';
import Profession from './profession';

const UserTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => (
        <Link to={`/users/${user._id}`}>{user.name}</Link>
      )
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities}/>
    },
    professions: {
      component: (user) => <Profession id={user.profession}/>,
      name: 'Профессия'
    },
    completedMeetings: {
      path: 'completedMeetings',
      name: 'Встретился, раз'
    },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookMark(user._id)}
        />
      )
    }
  };
  const caret = (path) => {
    if (path === selectedSort.path) {
      const caretDirection = selectedSort.order === 'asc'
        ? 'up'
        : 'down';
      return <i className={`bi bi-caret-${caretDirection}-fill`}/>;
    }
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    >
      <TableHeader renderCaret={caret} {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
    </Table>
  );
};
UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};
export default UserTable;
