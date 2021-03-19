import React from "react";
import { Link } from 'react-router-dom';
import {ReactComponent as DoctorImage} from "../images/doctor.jpeg";
const HomePage=()=>{
    return(
        <div className= "ui three column grid">
            <div className="column">
                <div className="ui fluid card">
                    <div className="image">
                        <img src="../images/doctor.jpeg" />
                    </div>
                    <div className="content">
                        <a className="header"> Doctor </a>
                    </div>
                    <div className="ui two column grid">
                        <div className="column"> 
                        <Link className="ui button" to="/doctorlogin"> Login </Link>
                        </div>
                        <div className="column"> 
                        <Link className="ui button" to="/doctorcreate"> Register </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="ui fluid card">
                <div className="image">
                        <img src="./images/patient.png"/>
                    </div>
                    <div className="content">
                        <a className="header"> Patient </a>
                    </div>
                    <div className="ui two column grid">
                        <div className="column"> 
                        <Link className="ui button" to="/patientlogin"> Login </Link>
                        </div>
                        <div className="column"> 
                        <Link className="ui button" to="/patientcreate"> Register </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="ui fluid card">
                <div className="image">
                        <img src="./images/employee.png"/>
                    </div>
                    <div className="content">
                        <a className="header"> Employee </a>
                    </div>
                    <div className="ui two column grid">
                        <div className="column"> 
                        <button className="ui button"> Login </button>
                        </div>
                        <div className="column"> 
                        <button className="ui button"> Register </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage;