import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { isAnyOf } from "@reduxjs/toolkit";


//CreateAsyncThunk is a function that allows us to get data asynchronously
//It takes type and a function that returns a promise
//Type has to be a name of the slice , slash , name of the action
export interface Character {
  id: number;
  name: string;
  weapon: string;
  fraction: string;
  damagePerHit: number;
  health: number;
};

export interface CharactersState {
  characterList: Character[];
  characterToUpdate: Character | null;
  status: string;
  error: any;
  battleCharacters: Character[];
};

const initialState: CharactersState = {
  characterToUpdate: null,
  characterList: [],
  status: "idle",
  error: null,
  battleCharacters: [],
};

export const getCharacters = createAsyncThunk(
  "characters/getCharacters", 
  async () => {
    const response = await axios.get('http://localhost:8080/characters');
    return response.data;
  }
);

//1. We fill in information about our character
//2. We press 'Add character' button
//3. We send a character to the server
//4. Character is created in the database
//5. We get the character that was created with id information
export const addCharacter = createAsyncThunk("characters/addCharacter", async (character: Character) => {
  const response = await axios.post("http://localhost:8080/characters", character);
  return response.data;
});


//axios.put is used to update a character
export const updateCharacter = createAsyncThunk("characters/addCharacter", async (character: Character) => {
  const response = await axios.put(`http://localhost:8080/characters/${character.id}`, character);
  return response.data;
});


//redux data flow
//1. We click on a button that triggers an action
//2. The action is dispatched to the store( we need to provide type and played)
//3. The store dispatches the action the state is updated
//4. Correct reducer is called and state is updated
//5. The component is re-render

//Slice in the redux is a container that holds the state of the part of the application
//and provides actions and reducers to manage the state 
export const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
      setCharacterToUpdate: (state, action) => {
        return {
          characterList: state.characterList,
          battleCharacters: state.battleCharacters,
          status: state.status,
          error: state.error,
          characterToUpdate: action.payload,
      };
      },
        //In canonical redux, we can't mutate state directly, we need to return a new state
        //But slices use Immer Library to do immutable state mutations behind the scenes
        //so we can mutates state directly.
        //In this case reducer is not only reducer but also an action creator
      setBattleCharacters: (state, action) => {
        //state.battleCharacters = action.payload; will not work
        return {
            characterList: state.characterList,
            battleCharacters: action.payload,
            status: state.status,
            error: state.error,
            characterToUpdate: state.characterToUpdate
        };
      },
    },
    extraReducers(builder){
      builder.addCase(getCharacters.pending, (state, action) => {
        state.status = "loading";
      }).addCase(getCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characterList = action.payload;
      }).addCase(getCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error
      }).addMatcher(isAnyOf(addCharacter.pending, updateCharacter.pending), (state, action) => {
        state.status = "loading";
      }).addMatcher(isAnyOf(addCharacter.fulfilled, updateCharacter.fulfilled), (state, action) => {
        state.status = "succeeded";
        state.characterList.push(action.payload);
      }).addMatcher(isAnyOf(addCharacter.rejected, updateCharacter.rejected), (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
    }
  });
  
  // Action creators are generated for each case reducer function
  export const { setBattleCharacters, setCharacterToUpdate } = charactersSlice.actions;
  export default charactersSlice.reducer