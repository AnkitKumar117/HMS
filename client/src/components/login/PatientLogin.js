import React, { useState } from 'react';
import Axios from '../../apis/Axios';

const PatientLogin = () => {
  const [patient, setPatient] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(value)
    setPatient((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(patient);
    (async () => {
      const payload = {
        "email": patient.email,
        "password": patient.password
      }
      const response = await Axios.post('/patient/login', payload);
      if(response.status === 200) {
        setPatient(prevState => ({
          ...prevState,
          'successMessage': 'Login successful. Redirecting to home.'
        }))
        console.log(response.data.token);
        localStorage.setItem('isSignedIn', true);
        localStorage.setItem('token', response.data.token);
        console.log('user logged in successfully')
      }else {
        console.log('Login failed')
      }
    })()
  };

  return (
    <div className="main-form">
      <h2>Patient Login</h2>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="abc@xyz.com"
            id="email"
            value={patient.email}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={patient.password}
            onChange={handleChange}
          />
        </div>
        <button
          className="ui button primary"
          onClick={handleSubmit}
          style={{ marginTop: "10px" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default PatientLogin;