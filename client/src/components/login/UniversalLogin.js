import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Select from "react-select";
import "./Form.css";
// import Header from '../Headers/UnAuthHeader';
import axios from "axios";
import UnAuthHeader from "../Headers/UnAuthHeader";

const Login = () => {
  const [log, setLog] = useState('');
  const [user, setUser] = useState({
    email: "",
    password: "",
    user: "Doctor",
  });

  useEffect( () => {}, [log]);
  if(log === 'Patient'){
    return <Redirect to="/patientprofile" />
  }

  if(log === 'Doctor'){
    return <Redirect to="/doctorprofile" />
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    console.log(id, value);
  };

  const options = [
    { value: "Doctor", label: "Doctor" },
    { value: "Patient", label: "Patient" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.user === 'Doctor') {
      (async () => {
        const payload = {
          email: user.email,
          password: user.password,
        };
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:5000/doctor/login",
            data: payload,
          });
          setUser((prevState) => ({
            ...prevState,
            successMessage: "Registration successful. Redirecting to home.",
          }));
          console.log(response.data.token);
          localStorage.setItem("isSignedInDoctor", true);
          localStorage.setItem("token", response.data.token);
          console.log("Doctor logged in successfully");
          setLog('Doctor')
        } catch (e) {
          console.log("Login failed:", e);
        }
      })();
    }else {
      (async () => {
        const payload = {
          email: user.email,
          password: user.password,
        };
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:5000/patient/login",
            data: payload,
          });
          setUser((prevState) => ({
            ...prevState,
            successMessage: "Registration successful. Redirecting to home.",
          }));
          console.log(response.data.token);
          localStorage.setItem("isSignedInPatient", true);
          localStorage.setItem("token", response.data.token);
          console.log("patient logged in successfully");
          setLog('Patient')
        } catch (e) {
          console.log("Login failed:", e);
        }
      })();
    }
    
  };

  return (
    <div>
      <UnAuthHeader />
      <div className="main-form">
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit} className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="abc@xyz.com"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="ui form field">
            <label>Login As:</label>
              <Select options={options} onChange={(e) => {
                console.log(e.value);
                setUser((prevState) => ({
                  ...prevState,
                  user: e.value,
                }));
              }}/>
          </div>
          <button
            className="ui button primary"
            onClick={handleSubmit}
            style={{ 'marginTop': '10px', 'marginBottom': '10px' }}
          >
            Login
          </button>
        </form>
        <Link to="/universalsignup" style={{'color': 'rgb(189, 129, 95)'}}>Do not have an account? Signup</Link>
      </div>
    </div>
  );
};

export default Login;