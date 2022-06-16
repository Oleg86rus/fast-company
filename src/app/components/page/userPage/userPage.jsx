import React from 'react';
import Loading from '../../ui/loading';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import Comments from '../../ui/comments';
import { useUser } from '../../../hooks/useUsers';
import PropTypes from 'prop-types';

const User = ({ userId }) => {
  const {getUserById} = useUser();
  const user = getUserById(userId);
  return (
    <>
      {user ? (
        <div className='container'>
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user} />
              <QualitiesCard data={user.qualities} />
              <MeetingsCard value={user.completedMeetings} />
            </div>
            <div className="col-md-8">
              <Comments />
            </div>
          </div>
        </div>
      ) : <Loading/>}
    </>
  );
};
User.propTypes = {
  userId: PropTypes.string
};

export default User;