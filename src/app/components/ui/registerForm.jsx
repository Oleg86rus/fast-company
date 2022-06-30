import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckboxField from '../common/form/checkboxField';
import { getQualities } from '../../store/qualities';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessions } from '../../store/professions';
import { sighUp } from '../../store/users';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    name: '',
    qualities: [],
    licence: false
  });
  const qualities = useSelector(getQualities());
  const [errors, setErrors] = useState({});
  const professions = useSelector(getProfessions());
  
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const qualitiesList = qualities.map(q=>({label: q.name, value: q._id}));
  const professionList = professions.map(p=>({label: p.name, value: p._id}));
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
      },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapital: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберете вашу профессию'
      }
    },
    licence: {
      isRequired: {
        message: 'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
      }
    }
  };
  
  const validate = () => {
    // eslint-disable-next-line no-shadow
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { qualities } = data;
    const newData = {...data, qualities: qualities.map(q=>q.value)};
    dispatch(sighUp(newData));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выбери свою профессию"
        options={professionList}
        defaultOption="Выбрать..."
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
        options={qualitiesList}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
      />
      <CheckboxField value={data.licence} onChange={handleChange} name="licence"
        error={errors.licence}>
        Подтвердить <a>лицензионное соглашение</a>
      </CheckboxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};
export default RegisterForm;