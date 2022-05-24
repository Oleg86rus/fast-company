import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckboxField from '../common/form/checkboxField';
import { useParams } from 'react-router-dom';
import API from '../../api';
import Loading from './loading';
import { validator } from '../../utils/validator';
import BackHistoryButton from '../common/backButton';

const EditUserForm = () => {
  const params = useParams();
  const { userId } = params;
  const [data, setData] = useState();
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState({});
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
  useEffect(() => {
    if (user) {
      const userQualities = Object.keys(user.qualities).map((quality) => ({
        value: user.qualities[quality]._id,
        label: user.qualities[quality].name,
        color: user.qualities[quality].color
      }));
      const userProfession = {
        value: user.profession._id,
        label: user.profession.name
      };
        
      setData({
        ...user,
        qualities: userQualities,
        profession: user.profession._id,
        licence: false
      });
    }
  },
  [user]);
  const handleChange = (target) => {
    setData((prevState) => {
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
    },
    qualities: {
      isRequired: {
        message: 'Необходимо выбрать хотя бы одно качество'
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
      if (prof.value === id) {
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
    API.users.update(userId,
      {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      });
  };
  return (
    <div className="container mt-5">
      <BackHistoryButton/>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {data && professions.length > 0
            ?
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
                label="Выбери профессию"
                options={professions}
                defaultOption={data.profession._id}
                name="profession"
                onChange={handleChange}
                value={data.profession}
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
                error={errors.qualities}
              />
              <CheckboxField value={data.licence} onChange={handleChange}
                name="licence"
                error={errors.licence}>
                Подтвердить изменения
              </CheckboxField>
              <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
              >
                Подтвердить
              </button>
            </form>
            : <form><Loading/></form>
            
          }
        </div>
      </div>
    </div>
  );
};
export default EditUserForm;