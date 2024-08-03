import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignGeneral from "./components/Auth/Sign/SignGeneral";
import "./App.css";
import ProfileDemandeur from "./components/Profile/ProfileDemandeur";
import ProfileEmployer  from "./components/Profile/ProfileEmployer"
import CV from "./components/DemandeOffer/CV/CV";
import Login from "./components/Auth/login/Login";
import SignEmployer from "./components/Auth/Sign/SignEmployer";
import SignApplicant from "./components/Auth/Sign/SignApplicant";
import CheckEmail from "./components/Auth/pwd/CheckEmail";
import Landing from "./components/Home/landing";
import AboutUs from "./components/AboutUS/AboutUs";
import AccountCreated from "./components/Auth/Sign/AccountCreated";
import CreatedEmployer from "./components/Auth/Sign/CreatedEmployer";
import AdminDash from "./components/admin/adminDash";
import { Provider } from "react-redux";
import { store } from "./components/state/store";
import EmployList from "./components/admin/EmplList";
import DemandList from "./components/admin/DemandList";
import AppliList from "./components/admin/AppliList";
import AdminsList from "./components/admin/SousAdmin";
import ResetPsswd from "./components/Auth/pwd/ResetPsswd";
import ForgetPass from "./components/Auth/pwd/ForgetPsswd";
import OffersList from "./components/admin/OffersList";
import RegisterEmail from "./components/Auth/pwd/RegisterEmail";
import OfferSend from "./components/DemandeOffer/OfferSend.jsx";
import AllJobs from "./components/Employeur/JobOffers/listJobOffers/AllJobs";
import MyJobOffers from "./components/Employeur/JobOffers/listJobOffers/MyJobOffers";
import ForgetPsswd from "./components/Auth/pwd/ForgetPsswd"
import MyApplications from "./components/Demandeur/MyApplications";
import AddOffer from "./components/Employeur/JobOffers/AddOffer/AddOffer";
import JobInfoDemand from "./components/Demandeur/JobInfoDemand";
import InfoOffer from "./components/Employeur/JobOffers/jobInfos/JobInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppInfo from "./components/Employeur/JobOffers/ApplicationCv/CV/AppInfo";
import StatiPage from "./components/admin/StatiPage";
import CvApplicant from "./components/admin/ApplicationCv/AppInfoAdmin";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  // const dispatch = useDispatch();
  // const isLogged = useSelector((state) => state.isLogged);
  let userSession = JSON.parse(localStorage.getItem("USER"));

  // console.log("is logged "+isLogged);
  // console.log("user "+userSession);
  const [formType, setFormType] = useState("Login");

  const handleFormSwitch = (formType) => {
    setFormType(formType);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/admin"
            element={
                <AdminDash /> 
            }
          />
          <Route path="/Employerslist" element={<EmployList />} />
          <Route path="/DemandeursList" element={<DemandList />} />
          <Route path="/AdminsList" element={<AdminsList />} />
          <Route path="/ForgetPsswd" element={<ForgetPsswd />} />
          <Route path="/AccountCreated" element={<AccountCreated />} />
          <Route path="/CreatedEmployer" element={<CreatedEmployer />} />
          <Route path="/AdminsList" element={<AdminsList />} />
          <Route path="/Admin/OffersList" element={<OffersList />} />
        
          <Route path="/about" element={<AboutUs />} />
          <Route path="/AccountCreated" element={<AccountCreated />} />
          <Route path="/SignApplicant" element={<SignApplicant />} />
          <Route path="/ResetPsswd/:token" element={<ResetPsswd />} />
          <Route path="/ForgetPsswd" element={<ForgetPass />} />
          <Route path="/CheckEmail" element={<CheckEmail />} />
          <Route path="/confirm/:email" element={<RegisterEmail />} />
          <Route path="/ResetPsswd" element={<ResetPsswd />} />
          <Route path="/ForgetPsswd" element={<ForgetPass />} />
          <Route path="/CheckEmail" element={<CheckEmail />} />
          <Route path="/AdminsList" element={<AdminsList />} />
          <Route path="/ProfileEmployer" element={<ProfileEmployer />} />
          <Route path="/ProfileDemandeur" element={<ProfileDemandeur/>} />
          <Route path="/CV" element={<CV/>} />
          <Route path="/OfferSend" element={<OfferSend/>} />
          <Route path="/CV/:idOffer" element={<CV/>} />
          <Route
            path="/login"
            element={
              formType === "Login" ? (
                <Login formType={Login} onFormSwitch={handleFormSwitch} />
              ) : (
                <SignGeneral
                  formType={SignGeneral}
                  onFormSwitch={handleFormSwitch}
                />
              )
            }
          />
          <Route path="/SignEmployer" element={<SignEmployer />} />
          <Route path="/SignApplicant" element={<  SignApplicant/>} />
        
          <Route exact path="/JobOffers" element={<AllJobs />} />
          <Route path="/InfoOffer/:jobId" element={<InfoOffer />} />
          <Route path="/InfoOfferDemandeur/:jobId" element={<JobInfoDemand />} />

          <Route path="/admin/applications/:offerId" element={<AppliList />} />
     
          <Route
            exact
            path="/Employeur/MyJobOffers"
            element={<MyJobOffers />}
          />
          <Route exact path="/MyApplications" element={<MyApplications />} />

          <Route
            path="/addOffer"
            element={
              userSession && userSession.role === "Employeur" ? (
                <AddOffer />
              ) : null
            }
          />

        <Route exact path="/AppInfo/:idOffer" element={<AppInfo />} />

        <Route exact path="/AppInfoAdmin/:idApp" element={<CvApplicant />} />


        <Route  path="/Statistics" element={<StatiPage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default AppWrapper;
