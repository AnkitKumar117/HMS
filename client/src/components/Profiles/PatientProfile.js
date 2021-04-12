import React , {useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PatientHeader from "../Headers/PatientHeader";

const PatientProfile = ()=>{
    const [data , setData] = useState("");

    useEffect( ()=>{
        (async ()=>{
            const token = localStorage.getItem('token');
            try {
                const response = await axios({
                    method: "get",
                    url:"http://localhost:5000/patient/me",
                    headers : {Authorization: `Bearer ${token}`}
                })
                console.log(response.data);
                console.log(response.data.email);
                setData(response.data.email)
                
            }
            catch(e){
                console.log('Patient profile error occured: ', e);
            }
        })();
    },[]);
    return (
        <div>
            <PatientHeader page="patient"/>
            <div className = "ui items">
                {data}
            </div>
            <button className = "ui teal button"> Edit Profile</button>
            <Link className = "ui teal button" to="/appointment"> Create Appointment</Link>
        </div>
    );
};

export default PatientProfile;
