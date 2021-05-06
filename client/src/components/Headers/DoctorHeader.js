import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const DoctorHeader = ({ page }) => {
  const [isSignedIn,setIsSignedIn ] = useState(
    localStorage.getItem("isSignedInDoctor")
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
          url: "http://localhost:5000/doctor/logout",
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem("token");
        localStorage.setItem("isSignedInDoctor", false);
        console.log(response);
        console.log("Doctor logged out successfully");
        setIsSignedIn(false);
      } catch (e) {
        console.log('Error in catch', e);
      }
    })();
  };

  return (
    <div className="ui secondary pointing menu" >
      <Link className={`${page === 'patient'? 'active': ''} item`} to="/mypatient">
        My Patients
      </Link>
      <div className="right menu">
        <Link  className={`${page === 'doctor'? 'active': ''} item`} to="/doctorprofile">
          My Profile
        </Link>

        <div onClick={Logout} className="item" style={{ cursor: "pointer" }}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;
