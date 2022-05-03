import React, { useEffect, useState } from 'react';

const SearchUsers = () => {
  const [userName, setUserName] = useState('');
  const handleChange = (e) => {
    setUserName(e.target.value);
  };
  useEffect(()=> {
    console.log(userName);
  }, [userName]);
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
        value={userName}
        onChange={handleChange}
        placeholder="Поиск по имени..."
      />
    </div>
  );
};
export default SearchUsers;