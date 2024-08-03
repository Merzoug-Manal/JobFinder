import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignGeneral.css";
// import FormInput from "./FormInput";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*-]).{3,24}$/

const SignGeneral = (props) => {
  const userRef = useRef();
  const errRef = useRef();

  const [nom, setNom] = useState("");
  const [validNom, setValidNom] = useState(false);

  const [prenom, setPrenom] = useState("");
  const [validPrenom, setValidPrenom] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

 
  let navigate = useNavigate();

  useRef(() => {
    useRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(nom);
    setValidNom(result);
  }, [nom]);

  useEffect(() => {
    const result = USER_REGEX.test(prenom);
    setValidPrenom(result);
  }, [prenom]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [password, matchPassword]);

  const handleChange1 = () => {
    setIsChecked1(true);
    setIsChecked2(false);
  };

  const handleChange2 = () => {
    setIsChecked1(false);
    setIsChecked2(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('nom', nom);
    localStorage.setItem('prenom', prenom);
    localStorage.setItem('password', password);
    if (isChecked1) {
      navigate("/SignApplicant");
    } else if (isChecked2) {
      navigate("/SignEmployer");
    }
  };

  const isValid = isChecked1 || isChecked2;

  return (
    <div className="main-content">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <p>
          Already have an account?{" "}
          <button
            className="link-btn btn"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        </p>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form className="signup-form" onSubmit={handleSubmit}>
        <div>
            <input
              className="input"
              onChange={(e) => setNom(e.target.value)}
              ref={userRef}
              type="text"
              id="Nom"
              name="Nom"
              required
              placeholder="Nom"
              autoComplete="off"
              aria-invalid={validNom ? "false" : "true"}
              aria-describedby="uidnote"

            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validNom ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validNom || !nom ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              onChange={(e) => setPrenom(e.target.value)}
              type="text"
              id="Prenom"
              name="Prenom"
              required
              placeholder="Prenom"
              autoComplete="off"
              aria-invalid={validPrenom ? "false" : "true"}
            />
             <FontAwesomeIcon
              icon={faCheck}
              className={validPrenom ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPrenom || !prenom ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              name="password"
              placeholder="password"
              aria-invalid={validPassword ? "false" : "true"}
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validPassword ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPassword || !password ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setMatchPassword(e.target.value)}
              id="passwordconf"
              name="passwordconf"
              required
              aria-invalid={validMatch ? "false" : "true"}
                         />
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPassword ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPassword ? "hide" : "invalid"}
            />
          </div>
          <div className="checkbox-group">
            <div className="box1">
              <label className="checkbox-container">
                <input
                  className="input"
                  type="checkbox"
                  checked={isChecked1}
                  onChange={handleChange1}
                />
                <div className="checkmark"></div>
               Applicant
              </label>
            </div>
            <div className="box2">
              <label className="checkbox-container">
                <input
                  className="input"
                  type="checkbox"
                  checked={isChecked2}
                  onChange={handleChange2}
                />
                <div className="checkmark"></div>
                Employer
              </label>
            </div>
          </div>
          <button
           className="btn"
           disabled={!validNom || !validPrenom || !validPassword || !validMatch || !isValid ? true : false}
         >
           Next
         </button>
        </form>
      </div>
    </div>
  );
};

export default SignGeneral;
