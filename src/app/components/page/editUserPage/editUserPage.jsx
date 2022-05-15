import React from 'react';
import EditUserForm from '../../ui/editUserForm';

const EditUserPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <EditUserForm/>
        </div>
      </div>
    </div>
  );
};
export default EditUserPage;