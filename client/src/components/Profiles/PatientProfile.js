import React , {useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PatientHeader from "../Headers/PatientHeader";

const PatientProfile = ()=>{
    const [patient, setPatient] = useState({});

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
                // console.log(response.data.email);
                setPatient(response.data)
            }
            catch(e){
                console.log('Patient profile error occured: ', e);
            }
        })();
    },[]);

    const renderprofile = ()=>{
        return(
          <div className="ui grid" style={{margin: '10px'}}>
              <div className = "six wide column"  style={{background:"#e8dae6" , textAlign:"center"}}>
                    <img className="ui medium circular image" src="https://visualpharm.com/assets/380/Guest%20Male-595b40b65ba036ed117d41bb.svg" />
                    <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}> <b>Name : </b>{patient.name}</p>
                    <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}><b>Age :</b> {patient.age}</p>
              </div>
              <div className="ten wide column" style={{ background: "#1ebb9f",padding: '35px'}}>
                  <div className="row" style={{  borderBottom: '1px solid #49303c', paddingBottom: '10px'}}>
                      <h1>Profile</h1>
                  </div>
                  <div className="ui two column grid" style={{ borderBottom: '1px solid #49303c', paddingTop: '15px', fontSize: '22px'}}>
                      <div className="column"> Email : <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}>{patient.email}</p></div>
                      <div className="column"> Contact : <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}>{patient.contact_detail}</p></div>

                  </div>
                  <div className="ui two column grid" style={{borderBottom: '1px solid #49303c',fontSize: '20px'}}> 
                      <div className="column"> Other : <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}>{patient.others}</p></div>
                      <div className="column"> Address : <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}>{patient.address}</p></div>
                  </div>
                  <div className="ui two column grid" style={{fontSize: '20px'}}> 
                      <div className="column">  <p style={{fontSize: '17px', marginTop: '10px', color: '#655a63'}}> <i style={{color:'black'}}>Identity: </i>Patient</p></div>
                  </div>
                  <Link className = "ui button" style={{float: 'right'}} to="/appointment"> Create Appointment</Link>
              </div>
          </div>
        );
    }
    return (
        <div className="ui container">
            <PatientHeader page="patient"/>
            {renderprofile()}
            
        </div>
    );
};

export default PatientProfile;
