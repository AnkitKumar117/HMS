import React, { useEffect, useState } from "react";
import DoctorHeader from "../Headers/DoctorHeader";
import axios from "axios";

const MyPatient = () => {
  const [appointment, setAppointment] = useState([]);
  const [selectedappointment, setSelectedappointment] = useState({});
  const [description, setDescription] = useState("");
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:5000/allappointment",
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(response.data);
        setAppointment(response.data);
      } catch (e) {
        console.log("Error in fetching appointments", e);
      }
    })();
  }, []);

  const renderappointmentlist = () => {
    return appointment.map((appointment) => {
      return (
        <div
          key={appointment._id}
          className="ui raised card"
          onClick={() => setSelectedappointment(appointment)}
          style={{ cursor: "pointer" }}
        >
          <div className="content">
            <div className="header">{appointment.patient_desc}</div>
          </div>
        </div>
      );
    });
  };
   const onSubmitDescription = ()=>{
     console.log(selectedappointment);
     const payload ={
       ...selectedappointment,
       doctor_desc: description
     };
     (async () => {
       const token = localStorage.getItem("token");
       try{
         const response = await axios({
           method:"patch",
           url: "http://localhost:5000/doctor/description",
           data: payload,
           headers: {Authorization: `Bearer ${token}`}
         });
         console.log(response.data);
       } catch(e){
         console.log("Error in updating doctor description", e);
       }

     })();
   };

  return (
    <div>
      <DoctorHeader page="patient" />
      <div className="ui two column grid">
        <div className="column">
          <h3> Patient Appointment List</h3>
          {appointment.length === 0 ? "" : renderappointmentlist()}
        </div>
        <div className="column">
          <div className="content">
            <h1>Patient Appointment</h1>
            <div className="column">
              <h3> Patient Name: {selectedappointment.patient_name} </h3>
              <h3> Age: {selectedappointment.patient_age}</h3>
              <p>Description: {selectedappointment.patient_desc} </p>
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
          <br></br>
          <button className="ui button" onClick={onSubmitDescription}>
            Confirm description
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPatient;
