import React from "react";
import { CharacterList} from "../Components/CharacterList/CharacterList";
import { CharacterSelection } from "../Components/CharacterSelection/CharacterSelection";
import {useNavigate} from "react-router-dom";

//Screens are composed of components and they group what we want to see on the screen at one time
export const CharacterScreen = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    if (!isLoggedIn) {
        navigate("/");
    }

    return (
        <>
            <CharacterList />
            <CharacterSelection />
        </>
    );
};