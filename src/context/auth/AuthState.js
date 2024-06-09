import { useState } from "react";
import AuthContext from "./authContext";
import profilePic from "../../Images/user.png";

const AuthState = (props) => {
  const [islogedin, setIsloggedin] = useState(false);
  const [userType, setUserType] = useState("");
  const [userData, setUserData] = useState({
    profilePhoto: profilePic,
    username: "Guest",  
  });

  return (
    <AuthContext.Provider
      value={{
        islogedin,
        setIsloggedin,
        userType,
        setUserType,
        userData,
        setUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
