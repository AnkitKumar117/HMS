import React, { useState } from 'react';
import Axios from '../../apis/Axios';

const DoctorCreate = () => {
    const [doctor, setNewDoctor] = useState({
        name: "",
        e_id:"",
        address:"",
        contact_detail:"",
        email:"",
        password: "",
        specialization:"",
        degree:""
      });
    
      const sendInfoToServer = async () => {
        console.log(doctor);
        const payload = {
            "name": doctor.name,
            "employee_id": doctor.e_id,
            "address": doctor.address,
            "contact_detail": doctor.contact_detail,
            "specialization": doctor.specialization,
            "Degree":doctor.degree,
            "email":  doctor.email,
            "password": doctor.password
            
        }
        try{
        const response = await Axios.post('/doctor', payload);
        if(response.status === 201) {
          setNewDoctor(prevState => ({
            ...prevState,
            'successMessage': 'Registration successful. Redirecting to home.'
          }))
          console.log(response.data.token);
          localStorage.setItem('isSignedIn', true);
          localStorage.setItem('token', response.data.token);
          console.log('doctor created successfully')
        }else {
          console.log('Unable to create account')
        }
      }
      catch(e){
        console.log('Error occured as doctor')
      }
      };
    
      const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(value)
        setNewDoctor((prevState) => ({
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
          <h2>Register as Doctor</h2>
          <form onSubmit={handleSubmit} className="ui form">
          <div className="field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                id="name"
                value={doctor.name}
                onChange={handleChange}
              />
            </div>
          <div className="field">
              <label>Employee ID</label>
              <input
                type="text"
                placeholder="Enter Employee Id"
                id="e_id"
                value={doctor.e_id}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                id="address"
                value={doctor.address}
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
                value={doctor.contact_detail}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Specialization</label>
              <input
                type="text"
                placeholder="Specialization"
                id="specialization"
                value={doctor.specialization}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Degree</label>
              <input
                type="text"
                placeholder="Degree"
                id="degree"
                value={doctor.degree}
                onChange={handleChange}
              />
            </div>
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
              Create account
            </button>
          </form>
        </React.Fragment>
      );
}

export default DoctorCreate;