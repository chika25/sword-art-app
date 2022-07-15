import React, {useState, useRef, useEffect} from 'react';
import { Input, Text, Button, Flex } from "@chakra-ui/react";
import { useNavigate} from "react-router-dom";

const adminCredentials = {userName: "admin", password: "admin"};
interface LoginProps {
  setLoggedIn: (isLoggedIn: boolean) => void;
}
// state: it is kind of a variable to store user input 
export const LoginScreen = ({setLoggedIn} : LoginProps) => {
  // rule 1: we never update the state directly, we always setState
  // rule 2: when state changes, the component re-renders
  // rele 3: setState is asynchromous, it doesn't block the execution of the code
  // Use state returns an array with two elements: state aand the function to update it
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //hook is used to navigate to another page
  const navigate = useNavigate();

  //countRef.current is a reference to the current value of count; e.g 0
  //1)Value of the reference is persistent across re-renders because values doesn't change on render
  //2)Changing value of the reference doesn't cause component to re-render
  //Count ref is used to log key presses in the username input
  const countRef = useRef(0);

  //We can also use refs to focus on some DOM element, usually input
  //It can be done in three steps
  //1)create a ref
  //2)We use useEffect to focus on the element
  //3)We use ref attribute to point to the element, in our case to the input
  const userNameRef = useRef<HTMLInputElement>(null);
  //current represents input 
  useEffect(() => {
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
  }, []);

  // when we type something in an input, ouchange event is triggered
  // to get the value of the input, we use event.target.value
  // you can create event handlers in two ways : anonymous function or using a named function
  
  const usernameHandler = (event: any) => {
    countRef.current++;
    
    setUserName(event.target.value);
  };

  const loginHandler = (event:any) => {
    if (
      userName === adminCredentials.userName &&
      password === adminCredentials.password
      ) {
        setLoggedIn(true);
        navigate("/characters")
      } else {
        setLoggedIn(false);
      }
  };

  return (
    <Flex justify={"center"} direction="column" align="center">
        <Text size={"lg"} mb="1%">User name: </Text>
        <Input
          ref={userNameRef}  
          mb="2%"
          type="text"  
          width="50%" 
          value={userName} 
          onChange={usernameHandler}
        />
        <Text size={"lg"} mb="1%">Password</Text>
        <Input
          mb="2%"
          type="password" 
          value={password} 
          width="50%"
          onChange={(e: any) => setPassword(e.target.value)} 
        />
        <Button colorScheme={"blue"} onClick={loginHandler}>Login</Button>
    </Flex>
  )
}
