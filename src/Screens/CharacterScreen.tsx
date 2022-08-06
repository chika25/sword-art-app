import React, { useEffect } from "react";
import { CharacterList} from "../Components/CharacterList/CharacterList";
import { CharacterSelection } from "../Components/CharacterSelection/CharacterSelection";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/redux";
import { getCharacters } from "../Slices/characterSlice";

//Screens are composed of components and they group what we want to see on the screen at one time
export const CharacterScreen = () => {
    const isLoggedIn = useSelector((store: any) => store.login.isLoggedIn);
    const navigate = useNavigate();

    const loading = useSelector((state: any) => state.characters.loading);
    const error = useSelector((state: any) => state.characters.error);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCharacters())
    }, [dispatch])

    if (!isLoggedIn) {
        navigate("/");
    }
    
    if(loading){
        return <div>Loading...</div>
    }

    if (error){
        return <div>Error: ${error.message}</div>
    }

    return (
        <>
            <CharacterList />
            <CharacterSelection />
        </>
    );
};