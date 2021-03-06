import React from 'react'
import './CharacterListItem.css'
import {Tr, Td } from "@chakra-ui/react";

// React component can receive one argument: props.
// You can pass date to the react component by using props.
// Props in an object that groups data that is passed to a component.
export const CharacterListItem = ({character, isChampion}) => {
  // reeturn lists of items
    const {name, health, fraction, weapon, damagePerHit} = character;
    return (
        <Tr key={name}>
          <Td className="character-name">
            {isChampion ? `Champion ${name}` : name}</Td>
          <Td isNumeric>{health}</Td>
          <Td>{fraction}</Td>
          <Td>{weapon}</Td>
          <Td isNumeric>{damagePerHit}</Td>
        </Tr>
      );
}


