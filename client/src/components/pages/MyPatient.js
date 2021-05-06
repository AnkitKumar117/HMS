import React, { useEffect, useState } from "react";
import DoctorHeader from "../Headers/DoctorHeader";
import axios from "axios";
import {Redirect} from "react-router-dom";

const MyPatient = () => {
  const [appointment, setAppointment] = useState([]);
  const [onsub, setOnsub] = useState(false);
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
  if(onsub===true){
    return <Redirect to="/doctorprofile" />
  }
  const renderappointmentlist = () => {
    var cnt=0;
    return appointment.map((appointment) => {
      if(!appointment.doctor_desc){
        cnt=1;
      return (
        <div
          key={appointment._id}
          className="ui raised card"
          onClick={() => setSelectedappointment(appointment)}
          style={{ cursor: "pointer" }}
        >
          <div className="content">
            <div className="header">Name: {appointment.patient_name}</div>
            <hr></hr>
            <div className="content">{appointment.patient_desc}</div>
          </div>
        </div>
      );}
      if(cnt===0){
        cnt=1;
        return (
          <div
          key={appointment._id}
          className="ui list"
          onClick={() => setSelectedappointment(appointment)}
          style={{ cursor: "pointer" }}
        >
           <div className="content">
            <div className="header" style={{fontSize: '17px', marginTop: '10px', color: '#655a63'}}>No new patients for today.</div>
          </div>
        </div>
        )
      }
    });
    
  };
   const onSubmitDescription = ()=>{
    //  console.log(selectedappointment);
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
         setOnsub(true);
       } catch(e){
         console.log("Error in updating doctor description", e);
       }

     })();
   };

  return (
    <div className="doctor">
      <div className="ui container">
      <DoctorHeader page="patient" />
      <div className="ui two column grid" style={{marginTop:"5%", background: 'white'}}>
        <div className="column" style={{textAlign:"left"}}>
          <h3> Patient Appointment List</h3>
          {appointment.length === 0 ? "No appointments for today" : renderappointmentlist()}
        </div>
        <div className="column" style={{ background: "#e6e6e6",padding: '35px'}}>
          <div className="content" >
            <h3>Patient Appointment</h3>
            <div className="column">
              <h4> Patient Name: {selectedappointment.patient_name} </h4>
              <h4> Age: {selectedappointment.patient_age}</h4>
              <p style={{marginBottom:"10px"}}>Patient description: {selectedappointment.patient_desc} </p>
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
          <button className="ui blue button" onClick={onSubmitDescription}>
            Confirm description
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MyPatient;
