import React, {useEffect , useState} from "react";
import axios from 'axios';
import DoctorHeader from "../Headers/DoctorHeader";


const DoctorProfile = () => {
    const [doctor , setDoctor] = useState({});
    useEffect(()=>{
        (async()=>{
            const token = localStorage.getItem('token');
            try {
                const response = await axios({
                    method:"get",
                    url: "http://localhost:5000/doctor/me",
                    headers: { Authorization: `Bearer ${token}`}
                })
                console.log(response.data);
                setDoctor(response.data);
            }
            catch(e){
                console.log('Doctor profile error occured: ', e);
            }
        })();
    },[]);

    const renderProfile = ()=>{
        return(
            <div className="ui grid" style={{margin: '10px'}}>
                <div className = "six wide column"  style={{background:"#e8dae6" , textAlign:"center"}}>
                      <img className="ui medium circular image"   src="https://visualpharm.com/assets/364/Doctor%20Male-595b40b65ba036ed117d3f68.svg"/>
                      <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}> <b>Name : </b>{doctor.name}</p>
                      <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}><b>Degree :</b> {doctor.Degree}</p>
                      <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}><b>Employee ID:</b> {doctor.employee_id}</p>
                     
                </div>
                <div className="ten wide column" style={{ background: "#1ebb9f",padding: '35px'}}>
                    <div className="row" style={{  borderBottom: '1px solid #49303c', paddingBottom: '10px'}}>
                        <h1>Profile</h1>
                    </div>
                    <div className="ui two column grid" style={{ borderBottom: '1px solid #49303c', paddingTop: '15px', fontSize: '22px'}}>
                        <div className="column"> Email : <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}>{doctor.email}</p></div>
                        <div className="column"> Contact : <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}>{doctor.contact_detail}</p></div>
  
                    </div>
                    <div className="ui two column grid" style={{borderBottom: '1px solid #49303c',fontSize: '20px'}}> 
                        <div className="column"> Specialization: <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}>{doctor.specialization}</p></div>
                        <div className="column"> Address : <p style={{fontSize: '17px', marginTop: '10px', color: '#514c4e'}}>{doctor.address}</p></div>
                    </div>
                    <div className="ui two column grid" style={{fontSize: '20px'}}> 
                        <div className="column">  <p style={{fontSize: '17px', marginTop: '10px', color: '#655a63'}}><i style={{color:'black'}}>Identity: </i>Doctor</p></div>
                    </div>
                </div>
            </div>
          );
    }

  return (
    <div>
    <DoctorHeader page="doctor"/>
    
    {renderProfile()}
    <button className="ui teal button">Edit Profile</button>
  </div>
  );
};

export default DoctorProfile;
