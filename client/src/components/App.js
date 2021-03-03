import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import DoctorLogin from "./login/DoctorLogin";
import DoctorCreate from './Authentication/DoctorCreate';
import PatientCreate from './Authentication/PatientCreate';
import PatientLogin from "./login/PatientLogin";

const App = () => {
  return (
    <BrowserRouter>
      <div className="ui container">
        <div>
          <Switch>
            <Route path="/doctorlogin" exact component={DoctorLogin} />
            <Route path="/doctorcreate" exact component={DoctorCreate} />
            <Route path="/patientcreate" exact component= {PatientCreate}/>
            <Route path="/patientlogin" exact component={PatientLogin} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
