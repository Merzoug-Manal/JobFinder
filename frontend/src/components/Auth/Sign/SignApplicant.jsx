import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const STRING_REGEX = /^[A-z][A-z0-9-_]{2,}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PHONE_REGEX = /^(\+213|0)(5|6|7)[0-9]{8,}$/;

const SignApplicant = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);

  const [dateNaissance, setDateNaissance] = useState("");
  const [validDate, setValidDate] = useState(false);

  const [addresse, setAddresse] = useState("");
  const [validAdresse, setValidAddresse] = useState(false);

  const [PlaceNaissance, setPlaceNaissance] = useState("");
  const [validPlaceNaissance, setValidPlaceNaissance] = useState(false);

  const [genre, setGenre] = useState("");
  const [validGenre, setValidGenre] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PHONE_REGEX.test(phone);
    const v3 = validDate;
    const v4 = STRING_REGEX.test(addresse);
    const v5 = STRING_REGEX.test(PlaceNaissance);
    const v6 = validGenre;

    if (!v1 || !v3 || !v4 || !v5 || !v6) {
      setErrMsg("Invalid Entry");
    }
    try {
      const apiUrl = "/auth/register/demandeur";
      const nom = localStorage.getItem("nom");
      const prenom = localStorage.getItem("prenom");
      const password = localStorage.getItem("password");
      const userData = {
        nom,
        prenom,
        email,
        password,
        phone,
        dateNaissance,
        PlaceNaissance,
        addresse,
        genre,
      };

      const response = await axios.post(apiUrl, userData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      console.log(response.data);
      localStorage.removeItem("nom");
      localStorage.removeItem("prenom");
      localStorage.removeItem("password");
      navigate("/CheckEmail");
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
    const result = STRING_REGEX.test(PlaceNaissance);
    setValidPlaceNaissance(result);
  }, [PlaceNaissance]);

  useEffect(() => {
    const result = STRING_REGEX.test(addresse);
    setValidAddresse(result);
  }, [addresse]);

  useEffect(() => {
    if (genre !== "") {
      setValidGenre(genre);
    }
  }, [genre]);

  useEffect(() => {
    if (dateNaissance !== "") {
      setValidDate(dateNaissance);
    }
  }, [dateNaissance]);

  return (
    <div className="main-content">
      <div className="auth-form">
        <h2>informations update</h2>
        <br />
        <p>Please fill in the fields to finalize the creation</p>
        <br />
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
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
            <select
              name="Company_type"
              id="Company_type"
              onChange={(e) => setGenre(e.target.value)}
              type="text"
              required
              aria-invalid={validGenre ? "false" : "true"}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Genre
              </option>
              <option value="Femelle">Femelle</option>
              <option value="Male">Male</option>
            </select>
            <FontAwesomeIcon
              icon={faCheck}
              className={validGenre ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validGenre || !genre ? "hide" : "invalid"}
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
              onChange={(e) => setDateNaissance(e.target.value)}
              type="date"
              placeholder="Date de naissance"
              id="Cite"
              name="Cite"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validDate ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validDate || !dateNaissance ? "hide" : "invalid"}
            />
          </div>
          <div>
            <input
              className="input"
              onChange={(e) => setPlaceNaissance(e.target.value)}
              type="text"
              placeholder="Place naissance"
              id="placeNaissance"
              name="placeNaissance"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={validPlaceNaissance ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                validPlaceNaissance || !PlaceNaissance ? "hide" : "invalid"
              }
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
          <button
            className="btn"
            disabled={
              !validEmail ||
              !validAdresse ||
              !validDate ||
              !validGenre ||
              !validPlaceNaissance
            }
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignApplicant;
