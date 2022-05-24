import React, { useEffect, useState } from 'react';
import API from '../../../api';
import { useParams } from 'react-router-dom';
import Loading from '../../ui/loading';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import Comments from '../../ui/comments';

const User = () => {
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  },
  []);

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

export default User;