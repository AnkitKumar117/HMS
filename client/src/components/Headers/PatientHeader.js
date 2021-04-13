import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const PatientHeader = ({page}) => {
  const [isSignedIn,setIsSignedIn ] = useState(
    localStorage.getItem("isSignedInPatient")
  );
  if (isSignedIn === false) {
    return <Redirect to="/"></Redirect>;
  }
  const Logout = () => {
    (async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/patient/logout",
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem("token");
        localStorage.setItem("isSignedInPatient", false);
        console.log(response);
        console.log("Patient logged out successfully");
        setIsSignedIn(false);
      } catch (e) {
        console.log('Error in catch', e);
      }
    })();
  };

  return (
    <div className="ui secondary pointing menu">
      <Link className={`${page==='report' ? 'active' : ''} item`} to="/myreport">
        My Report
      </Link>
      <div className="right menu">
        <Link className={`${page=== 'patient' ? 'active':''} item`} to="/patientprofile">
          My Profile
        </Link>

        <div onClick={Logout} className="item" style={{ cursor: "pointer" }}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
