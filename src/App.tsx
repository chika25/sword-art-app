import './App.css';
import React from "react";
import { Login } from "./Components/Login/Login";
import { CharacterList } from './Components/CharacterList/CharacterList';

// This type of component is called functional components
// Functional component should start with a capital letter,
// return JSX and be exported from a file


export const App = () => {
// JSX can have only one parent element
  const header = (
    <div className='App'>
      <h1 className='jsx-style'>Hello, Sword Art Gamers</h1>
      <h3>Welcome</h3>
    </div>
  );
const transformCharacterToListItem = (character: any) => {
  //   // When you use repeating elements in JSX, you should use key attribute
  //   // It's required for React to be able to update the element
  return (
    <li key={character.name}>
      <h3>{character.name}</h3>
      <p>{character.health}</p>
      <p>{character.fraction}</p>
      <p>{character.weapon}</p>
      <p>{character.damagePerHit}</p>
    </li>
  )
  };

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
const swordArtHeader = React.createElement(
  "h1",
  { className: "sword-art-header" },
  "Hello, Sword Art Gamers"
);
return (
  <div className="App">
    <Login />
    <CharacterList />
  </div>
);


  
// Elements can be also be rendered using JSX
// JSX element starts with parenthesis and ends with a closing parenthesis
  

};

export default App;
