import { useState } from 'react';
import AuthContext from './authContext';

const AuthState = (props) => {

    const [islogedin, setIsloggedin] = useState(false);
    const [userType, setUserType] = useState("");

  return (
    <AuthContext.Provider value={{islogedin, setIsloggedin, userType, setUserType}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;