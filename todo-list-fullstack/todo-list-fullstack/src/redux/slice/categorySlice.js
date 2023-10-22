import { createSlice } from '@reduxjs/toolkit'
import { getAllCategories } from '../../service';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    //getAllCategory
    categoriesAll: [],
    categoriesAllStatus: "idle",
    categoriesAllError: null,

  },
  reducers: {
 
  },
  extraReducers:{
    //get all Categories
    [getAllCategories.pending]: (state, action) => {
        state.categoriesAllStatus = "loading";
      },
      [getAllCategories.fulfilled]: (state, action) => {
        state.categoriesAll = action.payload;
        state.categoriesAllStatus = "succes";
      },
      [getAllCategories.rejected]: (state, action) => {
        state.categoriesAllStatus = "failed";
        state.categoriesAllError = action.error.message;
      },
  

  }
})

// Action creators are generated for each case reducer function
export const {  } = categorySlice.actions

export default categorySlice.reducer