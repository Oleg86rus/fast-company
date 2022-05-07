import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import CheckboxField from '../common/form/checkboxField';
// для использования библиотеки YUP
// import * as yup from 'yup';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  
  
  // для использования библиотеки YUP
  // const validateScheme = yup.object().shape({
  //
  //   password: yup.string().
  //     required('Пароль обязателен для заполнения').
  //     matches(/(?=.*[A-Z])/,
  //       'Пароль должен содержать хотя бы одну заглавную букву').
  //     matches(/(?=.*[0-9])/,
  //       'Пароль должен содержать хотя бы одно число').
  //     matches(/(?=.*[!@#$%^&*])/,
  //       'Пароль должен один из специальных символов !@#$%^&*').
  //     matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
  //   email: yup.string().
  //     required('Электронная почта обязательна для заполнения').
  //     email('Email введен некорректно')
  // });
  
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
    // eslint-disable-next-line no-shadow
    const errors = validator(data, validatorConfig);
    // eslint-disable-next-line no-unused-expressions
    // для использования библиотеки YUP
    // validateScheme.validate(data).then(()=>setErrors({})).catch((err)=>setErrors({[err.path]: err.message}));
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
    // eslint-disable-next-line no-shadow
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
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