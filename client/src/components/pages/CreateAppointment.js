import axios from "axios";
import {Redirect} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import PatientHeader from "../Headers/PatientHeader";

const CreateAppointment = () => {
  const [data, setData] = useState([]);
  const [onsub, setOnsub] = useState(false);
  const [selecteddoctor, setSelecteddoctor] = useState({});
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:5000/alldoctor",
        });
        console.log(response.data.length);
        setData(response.data);
      } catch (e) {
        console.log("Error in create appointment table", e);
      }
    })();
  }, []);
  if(onsub===true){
    return <Redirect to="/patientprofile"/>
  }
  const onSubmitAppointment = () => {
    const payload = {
      doctor_id: selecteddoctor._id,
      patient_desc: description,
      doctor_name: selecteddoctor.name,
      doctor_specialization: selecteddoctor.specialization,
    };
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/patient/appointment",
          data: payload,
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setOnsub(true);
      } catch (e) {
        console.log("Error in submitting appointment table", e);
      }
    })();

  };

  const renderdoctorlist = () => {
    return data.map((doctor) => {
      return (
        <div
          key={doctor._id}
          className="ui centered raised card"
          onClick={() => setSelecteddoctor(doctor)}
          style={{ cursor: "pointer" }}
        >
          <div className="content">
            <div className="header">{doctor.name}</div>
            <div className="meta">
              <span className="category">{doctor.specialization}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="doctor">
      <div className="ui container">
        <PatientHeader page="patient" />
        <div
          className="ui two column grid"
          style={{ marginTop: "5%", background: "white", height: '80vh' }}
        >
            <div className="column" style={{textAlign:"center"}}>
              <h3>Doctor List</h3>
              {data.length === 0 ? "No registered doctors" : renderdoctorlist()}
          </div>
          <div
            className="column"
            style={{ background: "#e6e6e6", padding: "35px" }}
          >
            <div className="content">
              <h1>Appointment</h1>
              <div className="column">
                <h4>Doctor Name:{selecteddoctor.name} </h4>
                <h4>Contact: {selecteddoctor.contact_detail}</h4>
                <h4>Specialization: {selecteddoctor.specialization}</h4>
              </div>
            </div>
            <div className="ui form">
              <div className="field">
                <label>Please write your description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <br />
            <button className="ui button" onClick={onSubmitAppointment}>
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateAppointment;
