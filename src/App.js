import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/homepage/Home';
import Navbar from './components/homepage/Navbar';
import ToastAnim from './libs/ToastAnim';
import Login from './components/loginsingup/Login';
// import Signup from './components/loginsingup/SignUp';
import Addjobs from './components/recruiter/Addjob';
import AuthState from './context/auth/AuthState';
import RecruiterProfile from './components/recruiter/RecruiterProfile';
import ApplicantProfile from './components/applicant/ApplicantProfile';
import RecruiterSignUp from './components/loginsingup/RecruiterSignUp';
import ApplicantSignUp from './components/loginsingup/ApplicantSignUp';
import MyJobs from './components/recruiter/MyJobs';
import AllJobs from './components/homepage/AllJobs';
import About from './components/homepage/About';

function App() {
  return (
    <>
      <AuthState>
        <Router>
          <Navbar />

          <ToastAnim />

          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About/>}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            {/* <Route exact path="/signup" element={<Signup />}></Route> */}
            <Route exact path="/addjobs" element={<Addjobs />}></Route>
            <Route exact path="/recruiterprofile" element={<RecruiterProfile/>}></Route>
            <Route exact path="/applicantprofile" element={<ApplicantProfile/>}></Route>
            <Route exact path="/recruitersignup" element={<RecruiterSignUp/>}></Route>
            <Route exact path="/applicantsignup" element={<ApplicantSignUp/>}></Route>
            <Route exact path="/myjobs" element={<MyJobs/>}></Route>
            <Route exact path="/alljobs" element={<AllJobs/>}></Route>
          </Routes>

        </Router>
      </AuthState>
    </>
  );
}

export default App;