import React from 'react';
import { CharacterListItem } from './CharacterListItem/CharacterListItem';
import { Table, TableCaption, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import './CharacterList.css';
import { useSelector } from 'react-redux';

// It export unordered list
// mapping array into CharacterListItem

// Props are passed to the component via attributes.
  export const CharacterList = () => {
    //By using selector, we basically get small peice of the data from the store
    // and we subscribe to it
    const characters = useSelector((state) => state.characters.characterList);
    //   return true if Math.random is more than 0.5
      return (
          <Table>
            <TableCaption>Character table</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Health</Th>
                <Th>Fraction</Th>
                <Th>Weaponn</Th>
                <Th isNumeric>Damage Per Hit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {characters.map((character) => (
                <CharacterListItem isChampion={Math.random() > 0.5} 
                character={character} />
              ))}
            </Tbody>  
          </Table>
      );
  };