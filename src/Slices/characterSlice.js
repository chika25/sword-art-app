import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//CreateAsyncThunk is a function that allows us to get data asynchronously
//It takes type and a function that returns a promise
//Type has to be a name of the slice , slash , name of the action
export const getCharacters = createAsyncThunk(
  "characters/getCharacters", 
  async () => {
    const response = await fetch('http://localhost:8080/characters');
    const data = await response.json();
    return data;
  }
);
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
    initialState: {
      characterList: [],
      status: "idle",
      error: null,
      battleCharacters: [],
    },
    reducers: {
        //In canonical redux, we can't mutate state directly, we need to return a new state
        //But slices use Immer Library to do immutable state mutations behind the scenes
        //so we can mutates state directly.
        //In this case reducer is not only reducer but also an action creator
      setBattleCharacters: (state, action) => {
        //state.battleCharacters = action.payload; will not work
        return {
            characterList: state.characterList,
            battleCharacters: action.payload,
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
;      });
    }
  });
  
  // Action creators are generated for each case reducer function
  export const { setBattleCharacters } = charactersSlice.actions;
  export default charactersSlice.reducer