import React, { useState } from "react";
import { Text, Checkbox, CheckboxGroup, Stack, Flex, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBattleCharacters } from "../../Slices/characterSlice";

export const CharacterSelection = () => {
    const characters = useSelector((state: any) => state.characters.characterList);
    //By using useDispatch, we can dispatch actions to the state
    const dispatch = useDispatch();
    // By using onChange handler, we render to the change of the checkbox and either add or
    // remove the value from the state array
    const [heroesSelected, setHerosSelected] = useState < Array<string>>([]);
    const [isAlterVisible, setIsAlterVisible] = useState(false);

    const navigate = useNavigate();

    const onHeroChanged = (event) => {
        const hero = event.target.value;
        if (heroesSelected.includes(hero)) {
            setHerosSelected(heroesSelected.filter(h => h !== hero));
        } else {
            setHerosSelected([...heroesSelected, hero]);
        }
    };

    const onFightStart = (e) => {
        if (heroesSelected.length !== 2) {
            setIsAlterVisible(true);
            return;
        }
        setIsAlterVisible(false);
        dispatch(setBattleCharacters(
            characters.filter((character) => heroesSelected.includes(character.name))
        ));
        navigate("/battleground")
    };

    const alert = (
        <Alert status="error">
            <AlertIcon/>
            Please select only two heroes
        </Alert>
    )

    console.log(heroesSelected);
    return ( 
        <Flex justify={"center"} align={"center"} direction={"column"}>
            <Text fontSize={"4xl"}>Select your champions!</Text>
            <CheckboxGroup colorScheme="green">
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    {characters.map((character: any) => (
                        <Checkbox 
                        isChecked={heroesSelected.includes(character.name)} 
                        onChange={onHeroChanged}
                        value={character.name} 
                        key={character.name}
                        >
                        {character.name}
                        </Checkbox>
                    ))}
                </Stack>
            </CheckboxGroup>
            <Button mt={"3%"}  mb={"3%"} colorScheme="red" variant="solid" onClick={onFightStart}>
                Start the battle!
            </Button>
            {isAlterVisible && alert}
        </Flex>
        
    );
};