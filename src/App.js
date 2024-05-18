import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/homepage/Home';
import Navbar from './pages/homepage/Navbar';
import ToastAnim from './libs/ToastAnim';
import Login from './pages/loginsingup/Login';
import Signup from './pages/loginsingup/SignUp';
import Addjobs from './pages/recruiter/Addjob';
import ApplicantSignUp from './pages/loginsingup/ApplicantSignUp';
import RecruiterSignUp from './pages/loginsingup/RecruiterSignUp';

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <ToastAnim />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path='/applicant-signup' element ={<ApplicantSignUp/>}></Route>
          <Route exact path='/recruiter-signup' element ={<RecruiterSignUp/>}></Route>
          <Route exact path="/addjobs" element={<Addjobs/>}></Route>
        </Routes>

      </Router>
    </>
  );
}

export default App;