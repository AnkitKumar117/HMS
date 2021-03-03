import React, { useState } from 'react';
import Axios from '../../apis/Axios';

const DoctorLogin = () => {
  const [doctor, setDoctor] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(value)
    setDoctor((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(doctor);
    (async () => {
      const payload = {
        "email": doctor.email,
        "password": doctor.password
      }
      const response = await Axios.post('/doctor/login', payload);
      if(response.status === 200) {
        setDoctor(prevState => ({
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
      <h2>Doctor Login</h2>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="abc@xyz.com"
            id="email"
            value={doctor.email}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={doctor.password}
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

export default DoctorLogin;