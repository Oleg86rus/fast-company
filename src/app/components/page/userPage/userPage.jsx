import React from 'react';
import Loading from '../../ui/loading';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import Comments from '../../ui/comments';
import PropTypes from 'prop-types';
import { CommentsProvider } from '../../../hooks/useComment';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../store/users';

const User = ({ userId }) => {
  const user = useSelector(getUserById(userId));
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
              <CommentsProvider>
                <Comments />
              </CommentsProvider>
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