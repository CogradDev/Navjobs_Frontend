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
import Signup from './components/loginsingup/SignUp';
import Addjobs from './components/recruiter/Addjob';
import AuthState from './context/auth/AuthState';

function App() {
  return (
    <>
      <AuthState>
        <Router>
          <Navbar />

          <ToastAnim />

          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/addjobs" element={<Addjobs />}></Route>
          </Routes>

        </Router>
      </AuthState>
    </>
  );
}

export default App;