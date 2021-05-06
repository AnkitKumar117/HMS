import React, { useState } from 'react';
import Axios from '../../apis/Axios';

const PatientCreate = ()=>{
    const [patient,  setNewPatient] = useState({
        name:"",
        age:"",
        address:"",
        contact_detail:"",
        others:"",
        email:"",
        password:""
        

    });
    const sendInfoToServer = async () => {
        console.log(patient);
        const payload = {
            "name": patient.name,
            "age":patient.age,
            "address": patient.address,
            "contact_detail": Number(patient.contact_detail),
            "email":  patient.email,
            "password": patient.password,
            "others": patient.others
            
        }
        const response = await Axios.post('/patient', payload);
        if(response.status === 201) {
          setNewPatient(prevState => ({
            ...prevState,
            'successMessage': 'Patient Registration successful. Redirecting to home.'
          }))
          console.log(response.data.token);
          localStorage.setItem('isSignedIn', true);
          localStorage.setItem('token', response.data.token);
          console.log('patient created successfully')
        }else {
          console.log('Unable to create account')
        }
      };
    
      const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(value)
        setNewPatient((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        sendInfoToServer();
      };
    
      return (
        <React.Fragment>
          <h2>Register as Patient</h2>
          <form onSubmit={handleSubmit} className="ui form">
          <div className="field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                id="name"
                value={patient.name}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Age</label>
              <input
                type="text"
                placeholder="Enter Age"
                id="age"
                value={patient.age}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                id="address"
                value={patient.address}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Contact Detail</label>
              <input
                type="text"
                maxLength="10"
                placeholder="Enter Mobile Number"
                id="contact_detail"
                value={patient.contact_detail}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Others</label>
              <input
                type="text"
                placeholder="Others"
                id="others"
                value={patient.others}
                onChange={handleChange}
              />
            </div>
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
              Create account
            </button>
          </form>
        </React.Fragment>
      );
}

export default PatientCreate;