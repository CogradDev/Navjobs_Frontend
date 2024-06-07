import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/homepage/Home";
import Navbar from "./components/homepage/Navbar";
import ToastAnim from "./libs/ToastAnim";
import Login from "./components/loginsingup/Login";
import Addjobs from "./components/recruiter/Addjob";
import ApplicantProfile from "./components/applicant/ApplicantProfile";
import RecruiterProfile from "./components/recruiter/RecruiterProfile";
import JobApplications from "./components/recruiter/JobApplications";
import RecruiterSignUp from "./components/loginsingup/RecruiterSignUp";
import ApplicantSignUp from "./components/loginsingup/ApplicantSignUp";
import About from "./components/homepage/About";
import AuthState from "./context/auth/AuthState";
import MyJobs from "./components/recruiter/MyJobs";
import AllJobs from "./components/homepage/AllJobs";
import Footer from "./components/homepage/Footer";
import EmployeePage from "./components/recruiter/EmployeePage";

function App() {
  return (
    <>
      <AuthState>
        <Router>
          <Navbar />
          <ToastAnim />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/addjobs" element={<Addjobs />} />
            <Route exact path="/recruiterprofile" element={<RecruiterProfile />} />
            <Route exact path="/applicantprofile" element={<ApplicantProfile />} />
            <Route exact path="/recruitersignup" element={<RecruiterSignUp />} />
            <Route exact path="/applicantsignup" element={<ApplicantSignUp />} />
            <Route exact path="/myjobs" element={<MyJobs />} />
            <Route exact path="/alljobs" element={<AllJobs />} />
            <Route path="/job/applications/:jobId" element={<JobApplications />} />
            <Route exact path="/emp" element ={<EmployeePage/>}/>
            <Route exact path="/footer" element={<Footer />} />
          </Routes>
        </Router>
      </AuthState>
    </>
  );
}

export default App;
