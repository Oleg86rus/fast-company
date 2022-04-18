import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UserTable = ({users, onSort, selectedSort, onToggleBookMark, onDelete}) => {
    const columns = {
        name: {path: 'name', name: 'Имя'},
        qualities: {name: 'Качества', component: (user)=>(<QualitiesList qualities={user.qualities}/>)},
        professions: {
            path: 'profession.name',
            name: 'Профессия'
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'},
        rate: {path: 'rate', name: 'Оценка'
        },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user)=>(
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )},
        delete: {component: (user)=>(
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(user._id)}
            >
                  Удалить
            </button>
        )}
    };
    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}>
            <TableHeader {...{onSort, selectedSort, columns}} />
            <TableBody {...{columns, data: users}} />
        </Table>
    );
};
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default UserTable;