import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PatientHeader from "../Headers/PatientHeader";

const MyReport = () => {
  const [myappointment, setMyappointment] = useState([]);
  const [selectedmyappointment, setSelectedmyappointment] = useState({});
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios({
          method: "get",
          url: "http://localhost:5000/myappointment",
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setMyappointment(response.data);
      } catch (e) {
        console.log("Error in fetching my appointments", e);
      }
    })();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const RenderReport = () => {
    return (
      <div
        className="content"
        style={{ padding: "5px", border: "2px solid black" }}
        ref={componentRef}
      >
        <h2> <center>My report</center> </h2>
        <div className="column">
          <div className="ui container">
            <h3> Hospital Name </h3>
            <hr />
            <div className="ui equal width grid">
              <div className="ui column" style={{ float: "left" }}>
                <b>Name: {selectedmyappointment.patient_name}</b>
                <p><b>Age:</b> {selectedmyappointment.patient_age}</p>
              </div>
              <div className="ui column" style={{ float: "right" }}>
                <b> Name: Dr {selectedmyappointment.doctor_name}</b>
                <p> <b>Degree:</b> {selectedmyappointment.doctor_specialization}</p>
              </div>
            </div>
            <hr />
           
            <div className="ui two column grid" >
              <div className="ui column" style={{float: "left"}}>
                <p style={{ textAlign: "left"}}>
                  <b>Patient Description: </b>
                  <p>{selectedmyappointment.patient_desc} </p>
                </p>
              </div>
              <div className="ui column" style={{float: "right"}}>
                <p>
                  <b> Doctor Description: </b>
                  <p>{selectedmyappointment.doctor_desc}</p>
                </p>
              </div>
            </div>
            <br />
            <hr />
            <div>
              <footer>
                <p>
                  {" "}
                  <i>Hospital address: </i> abc pincode:123123
                </p>
                <p>
                  <i>Hospital email: </i> hms@hms.com
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const rendermyappointmentlist = () => {
    return myappointment.map((myappointment) => {
      return (
        <div
          key={myappointment._id}
          className="ui raised card"
          onClick={() => setSelectedmyappointment(myappointment)}
        >
          <div className="content">
            <div className="header">{myappointment.patient_desc}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <PatientHeader page="patient" />
      <div className="ui two column grid">
        <div className="column">
          <h2> My appointment </h2>
          {myappointment.length === 0
            ? "No report found"
            : rendermyappointmentlist()}
        </div>
        <div className="column">
          <RenderReport />
          <button className="ui button" onClick={handlePrint}>
            Download/Print Report
          </button>
        </div>
      </div>
    </div>
  );
};
export default MyReport;
