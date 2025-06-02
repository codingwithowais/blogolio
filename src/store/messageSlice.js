import {createSlice} from '@reduxjs/toolkit'

const initialValue = {
    show: false,
    text: "",
    type: "success"
}

const messageSlice = createSlice({
    name: 'message',
    initialState: initialValue,
    reducers:{
        showMessage: function(state , action) {
            state.text = action.payload.text,
            state.show = true,
            state.type = action.payload.type
        },
        hideMessage: function(state , action){
            state.text = "",
            state.show = false,
            state.type = "success"
        }
    }
})


export default messageSlice.reducer
export const {showMessage , hideMessage} = messageSlice.actions;
