import React from "react";
import { Link } from "react-router-dom";
import UnAuthHeader from "../Headers/UnAuthHeader";

const HomePage = () => {
  console.log(localStorage.getItem("isSignedInDoctor"));
  console.log(localStorage.getItem("isSignedInPatient"));
  return (
    <div>
        <UnAuthHeader/>
      <div className="ui three column grid">
        <div className="column">
          <div className="ui fluid card">
            <div className="image">
              <img src="https://visualpharm.com/assets/364/Doctor%20Male-595b40b65ba036ed117d3f68.svg" />
            </div>
            <div className="content">
              <a className="header"> Doctor </a>
            </div>
            <div className="ui two column grid">
              <div className="column">
                <Link className="ui button" to="/universallogin">
                  {" "}
                  Login{" "}
                </Link>
              </div>
              <div className="column">
                <Link className="ui button" to="/universalsignup">
                  {" "}
                  Register{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="ui fluid card">
            <div className="image">
              <img src="https://visualpharm.com/assets/380/Guest%20Male-595b40b65ba036ed117d41bb.svg" />
            </div>
            <div className="content">
              <a className="header"> Patient </a>
            </div>
            <div className="ui two column grid">
              <div className="column">
                <Link className="ui button" to="/universallogin">
                  {" "}
                  Login{" "}
                </Link>
              </div>
              <div className="column">
                <Link className="ui button" to="/universalsignup">
                  {" "}
                  Register{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="ui fluid card">
            <div className="image">
              <img src="https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg" />
            </div>
            <div className="content">
              <a className="header"> Admin </a>
            </div>
            <div className="ui two column grid">
              <div className="column">
                <button className="ui button"> Login </button>
              </div>
              {/* <div className="column">
                <button className="ui button"> Register </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
