import React from 'react';
import { useHistory } from 'react-router-dom';
import button from 'bootstrap/js/src/button';

const BackHistoryButton = () => {
  const history = useHistory();
  return (
    <button className='btn btn-primary' onClick={() => history.goBack()}>
      <i className='bi bi-caret-left' />
      Назад
    </button>
  );
};
export default BackHistoryButton;