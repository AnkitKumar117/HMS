import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import DoctorLogin from "./login/DoctorLogin";
import DoctorCreate from './Authentication/DoctorCreate';
import PatientCreate from './Authentication/PatientCreate';
import PatientLogin from "./login/PatientLogin";
import HomePage from "./pages/HomePage";
import Login from "./login/UniversalLogin";
import SignUp from "./login/SignUp";
import DoctorProfile from "./Profiles/DoctorProfile";
import PatientProfile from "./Profiles/PatientProfile";
import CreateAppointment from "./pages/CreateAppointment";
import MyPatient from "./pages/MyPatient";
import MyReport from "./pages/MyReport";

const App = () => {
  return (
    <BrowserRouter>
      <div className="ui container">
        <div>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/myreport" exact component ={MyReport} />
            <Route path="/mypatient" exact component ={MyPatient} />
            <Route path="/appointment" exact component = {CreateAppointment} />
            <Route path="/patientprofile" exact component={PatientProfile} />
            <Route path="/doctorprofile" exact component={DoctorProfile} />
            <Route path="/universalsignup" exact component={SignUp} />
            <Route path="/universallogin" exact component={Login} />
            <Route path="/doctorlogin" exact component={DoctorLogin} />
            <Route path="/doctorcreate" exact component={DoctorCreate} />
            <Route path="/patientcreate" exact component= {PatientCreate} />
            <Route path="/patientlogin" exact component={PatientLogin} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
