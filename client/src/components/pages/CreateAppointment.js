import axios from "axios";
import React, { useEffect, useState } from "react";
import PatientHeader from "../Headers/PatientHeader";

const CreateAppointment = () => {
  const [data, setData] = useState([]);
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

  const onSubmitAppointment = () => {
    console.log(selecteddoctor);
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
          className="ui raised card"
          onClick={() => setSelecteddoctor(doctor)} style={{cursor: "pointer"}}
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
    <div>
      <PatientHeader page="patient"/>
      <div className="ui two column grid">
        <div className="column">
          {data.length === 0 ? "" : renderdoctorlist()}
        </div>
        <div className="column">
          <div className="content">
            <h1>Appointment</h1>
            <div className="column">
              <h2>{selecteddoctor.name} </h2>
            </div>
            <div className="column">
              Contact: {selecteddoctor.contact_detail}
            </div>
            <div className="column"> Specialization: {selecteddoctor.specialization}</div>
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
          <br/>
          <button className="ui button" onClick={onSubmitAppointment}>
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateAppointment;
