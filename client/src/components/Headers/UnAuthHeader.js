import React from "react";
import { Link } from 'react-router-dom';

const UnAuthHeader = () => {
  return (
    <div className="ui pointing menu class">
      <Link to="/" className="item">Hospital Management System</Link>
      <div className="right menu">
        <Link to="/universallogin" className="item">Login</Link>
      </div>
    </div>
  );
};

export default UnAuthHeader;
