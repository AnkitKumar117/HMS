import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  console.log(localStorage.getItem("isSignedInDoctor"));
  console.log(localStorage.getItem("isSignedInPatient"));
  return (
    <div className="home">
      <div className="ui container">                
        <div style={{ fontSize: '50px', marginTop: '30px'}}>
          Hospital Management System
        </div>

        <div style={{display: "flex" , justifyContent:"center"}}>
          <div className="ui three column grid" style={{ marginTop: "10%" }}>
            <div className="column" style={{ width: "17vw" }}>
              <div className="ui fluid card">
                <div className="image">
                  <img src="https://visualpharm.com/assets/364/Doctor%20Male-595b40b65ba036ed117d3f68.svg" />
                </div>
                <div className="content">
                  <a className="header"> Doctor </a>
                </div>
                
                    <Link className="ui button" to="/universallogin" style={{}}>
                      {" "}
                      Login{" "}
                    </Link>
                 
                    <Link className="ui button" to="/universalsignup">
                      {" "}
                      Register{" "}
                    </Link>
              </div>
            </div>
            <div className="column" style={{ width: "17vw" }}>
              <div className="ui fluid card">
                <div className="image">
                  <img src="https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg" />
                </div>
                <div className="content">
                  <a className="header"> Admin </a>
                </div>
                    <Link className="ui button" to="/adminlogin">
                      {" "}
                      Login{" "}
                    </Link> 
              </div>
            </div>
            <div className="column" style={{ width: "17vw" }}>
              <div className="ui fluid card">
                <div className="image">
                  <img src="https://visualpharm.com/assets/380/Guest%20Male-595b40b65ba036ed117d41bb.svg" />
                </div>
                <div className="content">
                  <a className="header"> Patient </a>
                </div>
    
                    <Link className="ui button" to="/universallogin">
                      {" "}
                      Login{" "}
                    </Link>
                  
                    <Link className="ui button" to="/universalsignup">
                      {" "}
                      Register{" "}
                    </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
