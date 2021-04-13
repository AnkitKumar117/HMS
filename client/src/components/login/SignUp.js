import React, {useState} from "react";
import DoctorCreate from "../Authentication/DoctorCreate";
import PatientCreate from "../Authentication/PatientCreate";
import UnAuthHeader from "../Headers/UnAuthHeader";
import "./Form.css";

const SignUp = () => {
  const [user, setUser] = useState({
    doctor: "active",
    patient: "",
  });
  const handleClick =(e)=>{
    const {id} = e.target;
    const _user = {doctor: "", patient:""};
    if(id === "doctor"){
      _user.doctor= "active";
    }
    else{
      _user.patient= "active";
    }
    setUser(_user);
  };

  return (
    <div>
      <UnAuthHeader/>
      <div className="main-form">
        <div className="ui secondary pointing menu">
          <div
            onClick={handleClick}
            className={`${user.doctor} item`}
            id="doctor"
          >
            Doctor
          </div>
          <div
          onClick={handleClick}
          className={`${user.patient} item`}
          id="patient"
        >
          Patient
        </div>
        </div>
        
        {user.doctor === "active" ? <DoctorCreate/>: <PatientCreate/>}
      </div>
    </div>
  );
};
export default SignUp