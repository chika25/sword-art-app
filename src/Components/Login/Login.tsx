import React, {useState} from 'react'

const adminCredentials = {userName: "admin", password: "admin"};
interface LoginProps {
  setLoggedIn: (isLoggedIn: boolean) => void;
}
// state: it is kind of a variable to store user input 
export const Login = ({setLoggedIn} : LoginProps) => {
  // rule 1: we never update the state directly, we always setState
  // rule 2: when state changes, the component re-renders
  // rele 3: setState is asynchromous, it doesn't block the execution of the code
  // Use state returns an array with two elements: state aand the function to update it
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // when we type something in an input, ouchange event is triggered
  // to get the value of the input, we use event.target.value
  // you can create event handlers in two ways : anonymous function or using a named function
  const usernameHandler = (event:any) => {
    setUserName(event.target.value);
  };

  const loginHandler = (event:any) => {
    if (
      userName === adminCredentials.userName &&
      password === adminCredentials.password
      ) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
  };

  console.log("isLogedin", isLoggedIn);
  return (
    <div>
        <label>User name: </label>
        <input type="text" value={userName} onChange={usernameHandler}/>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={loginHandler}>Login</button>
    </div>
  )
}
