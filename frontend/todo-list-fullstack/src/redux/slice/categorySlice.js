import { createSlice } from '@reduxjs/toolkit'
import { getAllCategories, getAllTodosCategory } from '../../service';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    //getAllCategory
    categoriesAll: [],
    categoriesAllStatus: "idle",
    categoriesAllError: null,



    categoryTodosAll:[],
    categoryTodosStatus:"idle",
    categoryTodosError:null,

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

    


      //todos with categories

      [getAllTodosCategory.pending]: (state, action) => {
        state.categoryTodosStatus = "loading";
      },
      [getAllTodosCategory.fulfilled]: (state, action) => {
        state.categoryTodosAll = action.payload;
        state.categoryTodosStatus = "succes";
      },
      [getAllTodosCategory.rejected]: (state, action) => {
        state.categoryTodosStatus = "failed";
        state.categoryTodosError = action.error.message;
      },
  

  }
})

// Action creators are generated for each case reducer function
export const {  } = categorySlice.actions

export default categorySlice.reducer