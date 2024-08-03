import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResetPsswd(props) {
  const [password, setPsswd] = useState("");
  const [psswd, setPassword] = useState(null);
  const { token } = useParams(); // use useParams() to access the token
  console.log("token value: ", token);
  
  const changePsswd = async (e) => {
    e.preventDefault();

    const data = {
      password,
      // include the token in the request body
    };

    try {
      const response = await axios.post(`http://127.0.0.1:5000/api/auth/reset-password/${token}`, data); // use template literal to include the token
      setPassword(response.data.psswd);
      console.log("response data: ", response.data);
      window.location.href = "/login"; // redirect to the login page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-content">
      <div className="auth-form">
        <h2>New Password</h2>
        <br />
        <form className="reset-form" onSubmit={changePsswd}>
          <input
            className="input"
            value={password}
            onChange={(e) => setPsswd(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="New password"
            required="required"
          />
          <button className="btn" type="submit">
            Change
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPsswd;
