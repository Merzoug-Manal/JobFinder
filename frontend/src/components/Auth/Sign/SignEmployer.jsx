import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const STRING_REGEX = /^[A-z][A-z0-9-_]{2,}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PHONE_REGEX = /^(\+213|0)(5|6|7)[0-9]{8}$/;
const Com_REGEX = /^[A-Z]{2}-\d{4}-\d{5}$/;


const SignEmployer = () => {

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);

  const [entreprise, setEntreprise] = useState("");
  const [validEntreprise, setValidEntreprise ] = useState(false);

  const [functionEntreprise, setFunctionEntreprise] = useState("");
  const [validFunction, setValidFunction] = useState(false);

  const [wilaya, setWilaya] = useState("");
  const [validWilaya, setValidWilaya] = useState(false);

  const [addresse, setAddresse] = useState("");
  const [validAdresse, setValidAddresse] = useState(false);

  const [numeroCommerial, setNumeroCommerial] = useState("");
  const [validCommerial, setValidCommerial] = useState(false);


  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PHONE_REGEX.test(phone);
    const v3 = STRING_REGEX.test(entreprise);
    const v4 = STRING_REGEX.test(functionEntreprise);
    const v5 = STRING_REGEX.test(wilaya);
    const v6 = Com_REGEX.test(numeroCommerial);
    
    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
      setErrMsg("Invalid Entry");
    }
    try {
      const apiUrl = "http://127.0.0.1:5000/api/auth/register/employeur";
      const nom = localStorage.getItem("nom");
      const prenom = localStorage.getItem("prenom");
      const password = localStorage.getItem("password");
      const userData = {
        nom,
        prenom,
        email,
        password,
        entreprise,
        functionEntreprise,
        phone,
        wilaya,
        addresse,
        numeroCommerial,
      };

      const response = await axios.post(apiUrl, userData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      localStorage.removeItem("nom");
      localStorage.removeItem("prenom");
      localStorage.removeItem("password");
      navigate("/CheckEmail");
    } catch (err) {
      console.log(err.response);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Email already exists");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };


  useRef(() => {
    useRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    const result = STRING_REGEX.test(entreprise);
    setValidEntreprise(result);
  }, [entreprise]);

  useEffect(() => {
    const result = STRING_REGEX.test(addresse);
    setValidAddresse(result);
  }, [addresse]);

  useEffect(() => {
    const result = STRING_REGEX.test(functionEntreprise);
    setValidFunction(result);
  }, [functionEntreprise]);

  useEffect(() => {
    const result = Com_REGEX.test(numeroCommerial);
    setValidCommerial(result);
  }, [numeroCommerial]);

  useEffect(() => {
    const result = STRING_REGEX.test(wilaya);
    setValidWilaya(result);
  }, [wilaya]);


  return (
    <div className="main-content">
      <div className="auth-form">
        <h2>informations update</h2>
        <br />
        <p>Please fill in the fields to finalize the creation</p>
        <br />
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form className="SignEmployer" onSubmit={handleSubmit}>
        <div>
            <input
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              required
              autoComplete="off"
              aria-invalid={validEmail ? "false" : "true"}
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Phone number"
              id="phone"
              name="phone"
              required
              autoComplete="off"
              aria-invalid={validPhone ? "false" : "true"}
            />
             <FontAwesomeIcon
              icon={faCheck}
              className={validPhone ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPhone || !phone ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              onChange={(e) => setAddresse(e.target.value)}
              type="text"
              placeholder="Cite of residence"
              id="Cite"
              name="Cite"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validAdresse ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validAdresse || !addresse ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              onChange={(e) => setEntreprise(e.target.value)}
              type="text"
              placeholder="Name Company"
              id="entreprise"
              name="entreprise"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validEntreprise ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEntreprise || !entreprise ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              onChange={(e) => setFunctionEntreprise(e.target.value)}
              type="text"
              placeholder="Employer Function"
              id="entreprise"
              name="entreprise"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validFunction ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validFunction || !functionEntreprise ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              onChange={(e) => setWilaya(e.target.value)}
              type="text"
              placeholder="Wilaya"
              id="wilaya"
              name="wilaya"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validWilaya ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validWilaya || !wilaya ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              onChange={(e) => setNumeroCommerial(e.target.value)}
              type="text"
              placeholder="Numero commercial"
              id="numero"
              name="numero"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validCommerial ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validCommerial || !numeroCommerial ? "hide" : "invalid"}
            />
          </div>
        
          <button
            className="btn"
            disabled={
              !validEmail ||
              !validAdresse ||
              !validCommerial ||
              !validEntreprise ||
              !validPhone ||
              !validFunction
              ||
              !validWilaya
            }
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignEmployer;
