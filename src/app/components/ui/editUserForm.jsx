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
  const [user, setUser] = useState();

  useEffect(() => {
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
    API.users.getById(userId).then((data) => setUser(data));

  },
  []);
  useEffect(()=>{
    if (user) {
      const userQualities = Object.keys(user.qualities).map((quality)=>({
        value: user.qualities[quality]._id,
        label: user.qualities[quality].name,
        color: user.qualities[quality].color
      }));
      console.log('userQualities: ', userQualities);
      setData({
        ...user,
        qualities: userQualities,
        licence: false
      });
    }
  }, [user]);
  const handleChange = (target) => {
    setData((prevState) => {
      console.log('target: ', target);
      console.log('prevState: ', prevState);
      return ({ ...prevState, [target.name]: target.value });
    });
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      }
    },
    licence: {
      isRequired: {
        message: 'Необходимо подтвердить внесение изменений'
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
    console.log('data: ', data);
   
    validate();
  },
  [data]);
  const isValid = Object.keys(errors).length === 0;

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        console.log('Новая Профессия: ', { _id: prof.value, name: prof.label });
        console.log('data: ', data);
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
    API.users.update(userId, {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
    history.replace(`/users/${userId}/`);
  };
  
  if (data) {
    console.log('data: ', data);
    // useEffect(()=>{
    //   const userQualities = Object.keys(data.qualities).map((quality)=>({
    //     value: data.qualities[quality]._id,
    //     label: data.qualities[quality].name,
    //     color: data.qualities[quality].color
    //   }));
    //   console.log('userQualities: ', userQualities);
    //   setData({
    //     ...data,
    //     qualities: userQualities
    //   });
    // },[]);
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          label="Электронная почта"
          name="email"
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
          defaultValue={data.profession}
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
          value={data.qualities}
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