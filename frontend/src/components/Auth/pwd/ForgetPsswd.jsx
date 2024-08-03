import React, { useState } from "react";
import axios from "axios";

function ForgetPsswd(props) {
  const [email, setEmail] = useState("");
  
  const sendEmail = async (e) => {
    e.preventDefault();

   
  const data = {
    email,
  };

  const response = await axios.post(
    "http://127.0.0.1:5000/api/auth/forget-password", data
 
  );
  console.log(response.data);
  
};

  return (
    <div className="main-content">
      <div className="auth-form">
        <h2>Reset your password</h2>
        <br />
        <p>
          Enter your email address and we will send you instructions to reset
          your password
        </p>
        <form className="reset-form" onSubmit={sendEmail}>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            required="required"
          />
          <button
            className="btn"
           type="submit"
           onClick={() => (window.location.href = "/CheckEmail")}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPsswd;
