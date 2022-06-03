import React from 'react'
import './CharacterListItem.css'

// React component can receive one argument: props.
// You can pass date to the react component by using props.
// Props in an object that groups data that is passed to a component.
export const CharacterListItem = ({character, isChampion}) => {
  // reeturn lists of items
    const {name, health, fraction, weapon, damagePerHit} = character;
    return (
        <li key={name}>
          <span className="character-name">{isChampion ? `Champion ${name}` : name}</span>
          <span>{health}</span>
          <span>{fraction}</span>
          <span>{weapon}</span>
          <span>{damagePerHit}</span>
        </li>
      );
}


