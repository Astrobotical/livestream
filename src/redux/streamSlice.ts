import { createSlice } from '@reduxjs/toolkit';

interface StreamState{
    isMuted:boolean,
}
const initialState :StreamState = {
    isMuted:false,
}

const streamSlice = createSlice({
    name: 'stream',
    initialState,
    reducers :{
        unMute: (state)=>{
            state.isMuted = false
        },
        Mute: (state)=>{
            state.isMuted =  true
        }
    }
   
})
export const {unMute,Mute} = streamSlice.actions;
export default streamSlice.reducer;