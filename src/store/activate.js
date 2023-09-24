import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 Name:'',
Img:''
}

export const ActivateSlice = createSlice({
  name: 'Activate',
  initialState,
  reducers: {
    setName: (state,actions) => {
      state.Name = actions.payload
    },
    setImg: (state,actions) => {
      state.Img = actions.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setName,setImg } = ActivateSlice.actions

export default ActivateSlice.reducer