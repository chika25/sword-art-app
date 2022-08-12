import React from 'react'
import './CharacterListItem.css'
import {Tr, Td, Button } from "@chakra-ui/react";
import { useAppDispatch } from '../../../hooks/redux';
import { setCharacterToUpdate } from '../../../Slices/characterSlice';
import { useNavigate } from 'react-router-dom';
// React component can receive one argument: props.
// You can pass date to the react component by using props.
// Props in an object that groups data that is passed to a component.
export const CharacterListItem = ({character, isChampion}) => {
  // reeturn lists of items
    const {name, health, fraction, weapon, damagePerHit} = character;
    
    const dispatch = useAppDispatch();
const navigate = useNavigate();

    const handleUpdate = () => {
      dispatch(setCharacterToUpdate(character));
      navigate('/manageCharacter');
      
    }
    return (
        <Tr key={name}>
          <Td className="character-name">
            {isChampion ? `Champion ${name}` : name}</Td>
          <Td isNumeric>{health}</Td>
          <Td>{fraction}</Td>
          <Td>{weapon}</Td>
          <Td isNumeric>{damagePerHit}</Td>
          <Td><Button colorScheme={"blue"} onClick={handleUpdate}>Update Character</Button></Td>
        </Tr>
      );
}


