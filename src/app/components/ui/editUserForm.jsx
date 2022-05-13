import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckboxField from '../common/form/checkboxField';
import { useHistory, useParams } from 'react-router-dom';
import API from '../../api';
import Loading from './loading';

const EditUserForm = () => {
  const history = useHistory();
  const params = useParams();
  const { userId } = params;
  const [data, setData] = useState();
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    API.users.getById(userId).then((data) => setData(data));
    API.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });
    API.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  },
  []);
  const moveToAllUsers = () => {
    history.replace(`/users/${userId}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // const isValid = validate();
    // if (!isValid) return;
    const { profession, qualities } = data;
    console.log({
      ...data,
      profession: profession,
      qualities: qualities
    });
  };
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    }
    
  };
  const isValid = Object.keys(errors).length === 0;

  if (data) {
    console.log(data.qualities);
    return (
      <form>
        <TextField
          label="Имя"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Электронная почта"
          name="password"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <SelectField
          label="Выбери свою профессию"
          options={professions}
          defaultOption="Choose..."
          name="profession"
          onChange={handleChange}
          value={data.profession}
          error={errors.profession}
        />
        <RadioField
          value={data.sex}
          onChange={handleChange}
          options={[
            { name: 'Male', value: 'male' },
            { name: 'Female', value: 'female' },
            { name: 'Other', value: 'other' }
          ]}
          name="sex"
          label="Выберите ваш пол"
        />
        <MultiSelectField
          onChange={handleChange}
          options={qualities}
          defaultValue={data.qualities}
          name="qualities"
          label="Выберите ваши качества"
        />
        <CheckboxField value={data.licence} onChange={handleChange} name="licence"
          error={errors.licence}>
        Подтвердить изменения
        </CheckboxField>
        <button
          className="btn btn-primary w-100 mx-auto"
          type="submit"
          disabled={!isValid}
        >
        Submit
        </button>
      </form>
    );}
  return (<form><Loading/></form>);
};
export default EditUserForm;