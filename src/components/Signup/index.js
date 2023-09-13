import React, { useState } from 'react';
import { useMutation, toastProperty } from 'react-query';
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { postData, error, success } from '../../Data';
import LoadingState from '../Loading';

import './index.scss';

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    emailAddress: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({
      ...data,
      [name]: value
    })
  };

  const mutation = useMutation((data) => postData(data, 'user/create'), {
    onSuccess: (res) => {
      console.log(res, 'ress');
      if(res.msg !== "OK") {
        Toastify({
          text: "Email used already",
          ...toastProperty,
          style: error,
        }).showToast()
    }else {
      Toastify({
        text: "Login was successful",
        ...toastProperty,
        style: success,
      }).showToast();
      navigate('/login')
      }
    },
  });

  const handleSubmit = async () => {
    if(data.emailAddress.length === 0) {
      Toastify({
        text: "Email Address is empty",
        ...toastProperty,
        style:error,
      }).showToast();
    } else if (data.password.length === 0) {
        Toastify({
          text: "Password is empty",
          ...toastProperty,
          style: error,
        }).showToast();
      } else if (data.firstName.length === 0) {
        Toastify({
          text: "First name is empty",
          ...toastProperty,
          style: error
        }).showToast();
      } else if (data.lastName.length === 0) {
        Toastify({
          text: "Last Name is empty",
          ...toastProperty,
          style:error
        }).showToast();
    } else {
      mutation.mutate(data);
    }
  }

  const handleRedirect = () => navigate('/login');

  return (
    <section className="auth">
      <section className="auth__section">
        <div className="auth__title-wrapper">
          <h1 className="auth__title">Register</h1>
        </div>
        <Form className="auth__form">
          <Form.Group 
            as={Row} 
            className="mb-3" 
            controlId="formPlaintextFirstName"
          >
            <Form.Label 
              column sm="4" 
              className="auth__text"
              name="firstName"
            >
              First Name
            </Form.Label>
            <Form.Control 
              size="lg" 
              type="text" 
              placeholder=""
              onChange={handleChange}
              name="firstName"
            />
          </Form.Group>
          <Form.Group 
            as={Row} 
            className="mb-3" 
            controlId="formPlaintextLastName"
          >
            <Form.Label 
              column sm="4" 
              className="auth__text"
              name="lastName"
            >
              Last Name
            </Form.Label>
            <Form.Control 
              size="lg" 
              type="text" 
              placeholder=""
              onChange={handleChange}
              name="lastName"
            />
          </Form.Group>
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
                    Submit
                  </Button>
          }
          <p 
            className="auth__none"
          >
            Have an account?{' '}
              <button 
                className="auth__reg"
                onClick={handleRedirect}
              >Click to Login</button>
          </p>
      </section>
    </section>
  )
}

export default Signup;
