import React, {useEffect , useState} from "react";
import axios from 'axios';
import DoctorHeader from "../Headers/DoctorHeader";


const DoctorProfile = () => {
    const [data , setData] = useState("");
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
                setData(response.data.email);
            }
            catch(e){
                console.log('Doctor profile error occured: ', e);
            }
        })();
    },[]);

  return (
    <div>
    <DoctorHeader page="doctor"/>
    <div className="ui items">{data}</div>
    <button className="ui teal button">Edit Profile</button>
  </div>
  );
};

export default DoctorProfile;
