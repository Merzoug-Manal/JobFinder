import React, {  useRef, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../state/auth_slice';

export const Login = (props) => {
  const userRef = useRef();
  const errRef = useRef();
  let navigate = useNavigate();
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("USER");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  function disp() {
    dispatch(actions.setLogin(true));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      setUser(response.data.user);

      localStorage.setItem("USER", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      disp();
      setEmail(response?.data.user.email);

      if (user.role === "super_admin" || user.role === "admin") {
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else if (user.role === "Demandeur") {
        setTimeout(() => {
          navigate('/JobOffers');
        }, 2000);
      } else if (user.role === "Employeur") {
        setTimeout(() => {
          navigate('/Employeur/MyJobOffers');
        }, 2000);
      } else {
        toast.error(response.data.err);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  return (
    <div className="main-content">
      <div className="auth-form">
        <h1>Log in</h1>
        <p>
          Don't have an account?{" "}
          <button
            className="btn link-btn"
            onClick={() => props.onFormSwitch("SignGeneral")}
          >
            Sign Up
          </button>
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="input"
            ref={userRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            required="required"
          />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            required="required"
            placeholder=" Password"
          />
          <button className="btn">Log In</button>
          <button
            className="btn forgot"
            onClick={() => (window.location.href = "/ForgetPsswd")}
          >
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onFormSwitch: PropTypes.func.isRequired,
};

export default Login;
