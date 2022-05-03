import React, { useEffect, useState } from 'react';
import TextField from '../textField';
import { validator } from '../../utils/validator';

const Login = () => {
  const [data, setData] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const handleChange = ({target}) => {
    setData((prevState)=>({...prevState, [target.name]: target.value}));
    console.log(target.name);
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
    // eslint-disable-next-line no-shadow
    const errors = validator(data, validatorConfig);
    // eslint-disable-next-line no-restricted-syntax
    // for (const fieldName in data) {
    //   if (data[fieldName].trim() === '') {
    //     errors[fieldName] = `${fieldName} обязательно для заполнения`;
    //   }
    // }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  useEffect(()=> {
    validate();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  const isValid = Object.keys(errors).length === 0;
  return (
    <div className="container mt-5">
      <div className="row">
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <h3 className='mb-4'>Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Электронная почта'
              name='email'
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label='Пароль'
              type='password'
              name='password'
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;