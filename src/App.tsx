import './App.css';
import React, { useState } from "react";
import { Login } from "./Components/Login/Login";
import { CharacterScreen } from "./Components/Screens/CharacterScreen";
import { useFetch } from './hooks/useFetch';
import { BattleGround } from './Components/Battleground/BattleGround';
// This type of component is called functional components
// Functional component should start with a capital letter,
// return JSX and be exported from a file


export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFightGoingOn, setFightStart] = useState(false);
  const [battleCharacters, setBattleCharacters] = useState([]);
  const characters = [
    {
        name: "Goku", 
        health: 100, 
        fraction:"Saiyan", 
        weapon: "Ki", 
        damagePerHit: 10
    },
    {
        name: "Bobrik", 
        health: 150, 
        fraction:"Random", 
        weapon: "Bow", 
        damagePerHit: 6
    },
    {
        name: "Valera", 
        health: 80, 
        fraction:"Ukraine", 
        weapon: "Tanto", 
        damagePerHit: 15
    },

  ];
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
  
 console.log("Selected characters", battleCharacters);

// JSX can have only one parent element
  // const header = (
  //   <div className='App'>
  //     <h1 className='jsx-style'>Hello, Sword Art Gamers</h1>
  //     <h3>Welcome</h3>
  //   </div>
  // );
const userNotLoggedIn = (
  <h3 className="not-logged-in">
    Please log in as admin to see character list
  </h3>
)


// const transformCharacterToListItem = (character: any) => {
//   //   // When you use repeating elements in JSX, you should use key attribute
//   //   // It's required for React to be able to update the element
//   return (
//     <li key={character.name}>
//       <h3>{character.name}</h3>
//       <p>{character.health}</p>
//       <p>{character.fraction}</p>
//       <p>{character.weapon}</p>
//       <p>{character.damagePerHit}</p>
//     </li>
//   )
//   };

  // This variable is assigned to a JSX element
  // JSX element starts with parenthesis and ends with a closing parenthesis
  // const characterList = (
  //   <ul>
  //     {characters.map((character) => (
  //       <li key={character.name}>
  //         <h3>{character.name}</h3>
  //         <p>{character.health}</p>
  //         <p>{character.fraction}</p>
  //         <p>{character.weapon}</p>
  //         <p>{character.damagePerHit}</p>
  //       </li>
  //     ))}
  //   </ul>
  // )

  // const characterList = (
  //   <ul>
  //     {characters.map(transformCharacterToListItem)}
  //   </ul>
  // )

//  JSX is called a javascript XML, this is a syntax extension
// for redering HTML in javascript
// Elements can be also be rendered using React.createElement()
// const swordArtHeader = React.createElement(
//   "h1",
//   { className: "sword-art-header" },
//   "Hello, Sword Art Gamers"
// );
return (
  <div className="App">
    {!isLoggedIn ? <Login setLoggedIn={setIsLoggedIn}/> : null}
    {isLoggedIn && !isFightGoingOn ? <CharacterScreen characters={characters} 
      setFightStart={setFightStart} setBattleCharacters={setBattleCharacters} /> : null}
      {isFightGoingOn ? <BattleGround battleCharacters={battleCharacters}/> : null}
  </div>
);


  
// Elements can be also be rendered using JSX
// JSX element starts with parenthesis and ends with a closing parenthesis
  

};

export default App;
