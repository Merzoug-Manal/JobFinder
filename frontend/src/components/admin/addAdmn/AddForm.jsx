import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const AddForm = ({fetchUsers,handleCloseDialog}) => {
  const userRef = useRef();
  const errRef = useRef();

  const token = localStorage.getItem("token");

  const [nom, setNom] = useState("");
  const [validNom, setValidNom] = useState(false);

  const [prenom, setPrenom] = useState("");
  const [validPrenom, setValidPrenom] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

 
  let navigate = useNavigate();

  useRef(() => {
    useRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email); 
    const v2 = USER_REGEX.test(nom);
    const v3 = USER_REGEX.test(prenom);
    const role = "admin";
    const active= "true";

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
    }
    try {
      const apiUrl = "/auth/register/admin";
      const userData = {
        nom,
        prenom,
        email,
        password,
        role,
        active
      };

      const response = await axios.post(apiUrl, userData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          Authorization: `Bearer ${token}`,
        },
      });
    
      toast.success("Admin added successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      handleCloseDialog();
      fetchUsers();

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

  return (
    <div className="auth-form">
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
     
      <button
       className="btn"  type="submit"
       disabled={!validNom || !validPrenom || !validPassword || !validMatch || !validEmail ? true : false}
     >
       Add
     </button>
    </form>
  </div>
  )
}

export default AddForm