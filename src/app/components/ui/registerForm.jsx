import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckboxField from '../common/form/checkboxField';
import { useQualities } from '../../hooks/useQalities';
import { useProfessions } from '../../hooks/useProfession';
import { useAuth } from '../../hooks/useAuth';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  });
  const { qualities } = useQualities();
  const [errors, setErrors] = useState({});
  const { professions } = useProfessions();
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const qualitiesList = qualities.map(q=>({label: q.name, value: q._id}));
  const professionList = professions.map(p=>({label: p.name, value: p._id}));
  const {singUp} = useAuth();
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    const newData = {...data, qualities: data.qualities.map(q=>q.value)};
    try {
      await singUp(newData);
    } catch (error) {
      setErrors(error);
    }
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