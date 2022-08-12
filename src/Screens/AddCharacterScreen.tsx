import { Stack, Input, Button, Alert, AlertIcon} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { addCharacter, Character, setCharacterToUpdate, updateCharacter } from "../Slices/characterSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Tip to update
//1 Make sure you provide id when you update the character (url should look like)
//http://localhost:8080/characters/1 and request type should be PUT
//2 Make sure you empty the characterToUpdate(make it null) once you perform the update, oe add will not work:
//3 Please implement appropriate action for update, it will look similar to add action:
//4 Make sure to covert cases in extraReducers
export const AddCharacterScreen = () => {
    const character = useSelector((state: any) => state.characters.characterToUpdate);

    const [name, setName] = useState(character ? character.name: "");
    const [fraction, setFraction] = useState(character ? character.fraction: "");
    const [health, setHealth] = useState(character ? character.health: "");
    const [damagePerHit, setDamagePerHit] = useState(character ? character.damagePerHit: "");
    const [weapon, setWeapon] = useState(character ? character.weapon: "");

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const validateValues = () => {
        if (name.length === 0 || fraction.length === 0 || parseInt(health) < 0 || parseInt(damagePerHit) < 0 || weapon.length === 0) {
            setIsAlertVisible(true);
            return false;
        }
        return true;
    };

    

    const handleCharacterAddition = () => {
        if (!validateValues()) {
            return;
        }
        setIsAlertVisible(false);
        const newCharacter = {
            name,
            fraction,
            health: parseInt(health),
            damagePerHit: parseInt(damagePerHit),
            weapon
        };
        dispatch(addCharacter(newCharacter as Character));
        navigate("/characters");
    };

    const handleCharacterAppdate = () => {
        
        if (!validateValues()) {
            return;
        }
        setIsAlertVisible(false);
        const updatedCharacter = {
            name,
            fraction,
            health: parseInt(health),
            damagePerHit: parseInt(damagePerHit),
            weapon
        };
        dispatch(updateCharacter(updatedCharacter as Character));
       //empty the characterToUpdate
        dispatch(setCharacterToUpdate(null));
        navigate("/characters");
        
    };

    const alert = (
        <Alert status="error">
            <AlertIcon />
            Please make sure your inputs are valid!
        </Alert>
    )
    return (
        <Stack spacing={4}>
       
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Please enter a character name" />
        
          <Input type="text" value={fraction} onChange={(e) => setFraction(e.target.value)} placeholder="Please enter a character fraction" />
       
          <Input type="text" value={health} onChange={(e) => setHealth(e.target.value)} placeholder="Please enter a character health" />
       
          <Input type="text" value={damagePerHit} onChange={(e) => setDamagePerHit(e.target.value)} placeholder="Please enter a character damage per hit" />
       
          <Input type="text" value={weapon} onChange={(e) => setWeapon(e.target.value)} placeholder="Please enter a character weapon" />
        
          <Button onClick={character ? handleCharacterAppdate :handleCharacterAddition}>{character ? "Update Character" : "Add Character" }</Button>
          {/* If it isAlertVisible is true, show alert */}
          {isAlertVisible && alert}
      </Stack>
    );
};