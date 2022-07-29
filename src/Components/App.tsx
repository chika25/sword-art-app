import './App.css';
import React, { useState } from "react";
import { LoginScreen } from "../Screens/LoginScreen";
import { CharacterScreen } from "../Screens/CharacterScreen";
import { useFetch } from '../hooks/useFetch';
import { BattleGroundScreen } from '../Screens/BattlegroundScreen';
import { WinnerScreen } from '../Screens/WinnerScreen';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
// This type of component is called functional components
// Functional component should start with a capital letter,
// return JSX and be exported from a file


export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [winner, setWinner] = useState(null);
  const { response, error} = useFetch(
    "https://jsonplaceholder.typicode.com/posts/"
  );

  if (!response){
    return <>Loading...</>;
  }

  if (error && error instanceof Error) {
    // we can use React. Fragment inside of div
    // Inreact we can't render objects or arrays
    return <>Error: {error.message}</>;
  }

return (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen setLoggedIn={setIsLoggedIn} />}/>
        <Route path="/characters" element={
          <CharacterScreen 
            isLoggedIn={isLoggedIn}
          />
         }
        />
        <Route path="/winner" element={<WinnerScreen isLoggedIn={isLoggedIn} winner={winner} />} />
        <Route path="/battleground" element={
          <BattleGroundScreen 
          isLoggedIn={isLoggedIn}
          setWinner={setWinner} 
          winner={winner} 
           />
          }
        />
      </Routes>
    </BrowserRouter>
  </div>
);


  
// Elements can be also be rendered using JSX
// JSX element starts with parenthesis and ends with a closing parenthesis
  

};


