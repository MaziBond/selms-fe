import React, { useState, useContext } from 'react';
import Toastify from 'toastify-js';
import { useNavigate } from "react-router-dom";
import { useMutation, } from 'react-query';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { postData, toastProperty, error, success, UserDetails } from '../../Data';
import LoadingState from '../Loading';

import './index.scss';

const Login = () => {
  const user = useContext(UserDetails);
  const navigate = useNavigate();
  const [data, setData] = useState({
    emailAddress: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({
      ...data,
      [name]: value
    })
  };

  const mutation = useMutation((data) => postData(data, 'user/login'), {
    onSuccess: (res) => {
      if(res.msg === 'User does not exist') {
        Toastify({
          text: "Email or password not correct",
          ...toastProperty,
          style: error,
        }).showToast();
      }
      else {
        const token = res.payload.token;
        const userData = res.payload.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        user.setTokenItem(token);
        user.setUserDetails(userData);
        navigate('/dashboard');
        Toastify({
          text: "Login was successful",
          ...toastProperty,
          style: success,
        }).showToast();
      }
    },
  });

  const handleSubmit = async () => {
    if(data.emailAddress.length === 0) {
      Toastify({
        text: "Email Address is empty",
        ...toastProperty,
        style: error
      }).showToast();
    } else if (data.password.length === 0) {
        Toastify({
          text: "Password is empty",
          ...toastProperty,
          style:error
        }).showToast();
    } else {
      mutation.mutate(data);
    }
  }

  const handleRedirect = () => navigate('/register');

  return (
    <section className="auth">
      <section className="auth__section">
        <div className="auth__title-wrapper">
          <h1 className="auth__title">Login</h1>
        </div>
        <Form className="auth__form">
          <Form.Group 
            as={Row} 
            className="mb-3" 
            controlId="formPlaintextEmail"
          >
            <Form.Label 
              column sm="4" 
              className="auth__text"
              name="emailAddress"
            >
              Email
            </Form.Label>
            <Form.Control 
              size="lg" 
              type="email" 
              placeholder="example@email.com"
              onChange={handleChange}
              name="emailAddress"
            />
          </Form.Group>
          <Form.Group 
            as={Row} 
            className="mb-3" 
            controlId="formPlaintextPassword"
          >
            <Form.Label 
              column sm="4" 
              className="auth__text"
            >
              Password
            </Form.Label>
            <Form.Control 
              size="lg" 
              type="password" 
              placeholder="Password" 
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
        </Form>
          {
            mutation.isLoading 
              ? <LoadingState />
              :  <Button 
                    variant="outline-primary" 
                    size="lg" 
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
          }
          <p 
            className="auth__none"
          >
            No account?{' '}
              <button 
                className="auth__reg"
                onClick={handleRedirect}
              >
                Click to Register
              </button>
          </p>
      </section>
    </section>
  )
}

export default Login;
