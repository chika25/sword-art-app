import './App.css';
import React from "react";
// This type of component is called functional components
// Functional component should start with a capital letter,
// return JSX and be exported from a file
// function App() {
//   return (
//     <div className="App">
//       <h1>Hello, Sword Art Gamers</h1>
//     </div>
//   );
// }

export const App = () => {
  

  const characters = [
    {name: "pikachu", health: 100, fraction:"aaa", weapon: "electricity", damagePerHit: 20},
    {name: "Meaus", health: 200, fraction:10, weapon: "gun", damagePerHit: 20},
    {name: "Goku", health: 300, fraction:"Saiyon", weapon: "Ki", damagePerHit: 20},

  ]

  const header = (
    <div className='App'>
      <h1 className='jsx-style'>Hello, Sword Art Gamers</h1>
    </div>
  );


// Elements can be also be rendered using JSX
  const swordArtHeader = React.createElement(
    "h1",
    { className: "sword-art-header" },
    "Hello, Sword Art Gamers"
  );
  return (
    <ul>
      {characters.map(character => {
        return (
          <li key={character.name}>
            <h3>{character.name}</h3>
            <p>{character.health}</p>
            <p>{character.fraction}</p>
            <p>{character.weapon}</p>
            <p>{character.damagePerHit}</p>
          </li>
        )
      })}
    </ul>
  )

}

export default App;
