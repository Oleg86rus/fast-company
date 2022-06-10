import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import CheckboxField from '../common/form/checkboxField';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const history = useHistory();
  const {singIn} = useAuth();
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});
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
    }
  };
  
  const validate = () => {
    const errors = validator(data, validatorConfig);
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
    console.log(data);
    try {
      await singIn(data);
      history.push('/');
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
      <CheckboxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckboxField>
      <button className="btn btn-primary w-100 mx-auto" type="submit"
        disabled={!isValid}>Submit
      </button>
    </form>
  );
};

export default LoginForm;