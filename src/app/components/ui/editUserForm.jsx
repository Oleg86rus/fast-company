import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckboxField from '../common/form/checkboxField';
import { useHistory, useParams } from 'react-router-dom';
import API from '../../api';
import Loading from './loading';
import { validator } from '../../utils/validator';

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
  const handleChange = (target) => {
    setData((prevState) => {
      console.log('target: ', target);
      console.log('prevState: ', prevState);
      return ({ ...prevState, [target.name]: target });
    });
  };
  useEffect(()=>{
    console.log('data: ', data);
  }, [data]);
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
  const validate = () => {
    const errors = validator(data,
      validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  useEffect(() => {
    validate();
  },
  [data]);
  const isValid = Object.keys(errors).length === 0;
  
  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) return { _id: prof.value, name: prof.label };
    }
  };
  
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        qualitiesArray.push({
          _id: qualities[quality].value,
          name: qualities[quality].label,
          color: qualities[quality].color
        });
      }
    }
    return qualitiesArray;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    setData({
      ...data,
      profession: getProfessionById(data.profession),
      qualities: getQualities(data.qualities)
    });
    console.log({
      ...data,
      profession: getProfessionById(data.profession),
      qualities: getQualities(data.qualities)
    });
    API.users.update(userId, data);
  };
  
  if (data) {
    return (
      <form onSubmit={handleSubmit}>
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
          typeOfPage='target.label'
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