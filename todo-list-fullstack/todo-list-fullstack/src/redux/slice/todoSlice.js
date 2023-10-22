import { createSlice } from "@reduxjs/toolkit";
import {
  addOneTodo,
  completed,
  dateasc,
  datedesc,
  deleteOneTodo,
  filterPriotry,
  getAllTodosCategory,
  getAllTodosUserId,
  sortingPriotry,
  updateOneTodo,
} from "../../service";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    //getAllTodo
    todosAll: [],
    todosAllStatus: "idle",
    todosAllError: null,

    todosAllFiltre:[]
  },
  reducers: {
    searchFiltred:(state,action)=>{
      const data=action.payload;
      if(data!==""){
        const newFiltredData=state.todosAllFiltre.filter((todo)=>todo.title.includes(data))
        state.todosAll=newFiltredData;

      }
      else{
        state.todosAll=state.todosAllFiltre;
      }   
    },
    completedAll:(state,action)=>{
      const newState=state.todosAllFiltre.filter((todo)=>todo.completed!==false)
      state.todosAll=newState
    },
    noCompleted:(state,action)=>{
      const newState=state.todosAllFiltre.filter((todo)=>todo.completed===false)
      state.todosAll=newState
    }

  },
  extraReducers: {
    //getAllUserId todos
    [getAllTodosUserId.pending]: (state, action) => {
      state.todosAllStatus = "loading";
    },
    [getAllTodosUserId.fulfilled]: (state, action) => {
      state.todosAll = action.payload;
      state.todosAllFiltre=action.payload
      state.todosAllStatus = "succes";
    },
    [getAllTodosUserId.rejected]: (state, action) => {
      state.todosAllStatus = "failed";
      state.todosAllError = action.error.message;
    },
    //sorting proitry,dateasc,datedesc
    [sortingPriotry.pending]: (state, action) => {
      state.todosAllStatus = "loading";
    },
    [sortingPriotry.fulfilled]: (state, action) => {
      state.todosAll = action.payload;
      state.todosAllFiltre=action.payload
      state.todosAllStatus = "succes";
    },
    [sortingPriotry.rejected]: (state, action) => {
      state.todosAllStatus = "failed";
      state.todosAllError = action.error.message;
    },
    /// date asc
    [dateasc.pending]: (state, action) => {
      state.todosAllStatus = "loading";
    },
    [dateasc.fulfilled]: (state, action) => {
      state.todosAll = action.payload;
      state.todosAllFiltre=action.payload
      state.todosAllStatus = "succes";
    },
    [dateasc.rejected]: (state, action) => {
      state.todosAllStatus = "failed";
      state.todosAllError = action.error.message;
    },
    ///date desc
    [datedesc.pending]: (state, action) => {
      state.todosAllStatus = "loading";
    },
    [datedesc.fulfilled]: (state, action) => {
      state.todosAll = action.payload;
      state.todosAllFiltre=action.payload
      state.todosAllStatus = "succes";
    },
    [datedesc.rejected]: (state, action) => {
      state.todosAllStatus = "failed";
      state.todosAllError = action.error.message;
    },
    //filter priotry
    [filterPriotry.pending]: (state, action) => {
      state.todosAllStatus = "loading";
    },
    [filterPriotry.fulfilled]: (state, action) => {
      state.todosAll = action.payload;
      state.todosAllFiltre=action.payload
      state.todosAllStatus = "succes";
    },
    [filterPriotry.rejected]: (state, action) => {
      state.todosAllStatus = "failed";
      state.todosAllError = action.error.message;
    },


    //getAllTodosByCategoryId
    [getAllTodosCategory.pending]: (state, action) => {
      state.todosAllStatus = "loading";
    },
    [getAllTodosCategory.fulfilled]: (state, action) => {
      state.todosAll = action.payload;
      state.todosAllFiltre=action.payload

      state.todosAllStatus = "succes";
    },
    [getAllTodosCategory.rejected]: (state, action) => {
      state.todosAllStatus = "failed";
      state.todosAllError = action.error.message;
    },

    //UpdateOneTodos

    //update todo
    [updateOneTodo.pending]: (state, action) => {
      state.todosAllStatus = "loading";
    },
    [updateOneTodo.fulfilled]: (state, action) => {
      const { id, title, text, priorityLevel,date,categoryId } = action.payload;
      const index = state.todosAll.findIndex(todo => todo.id === id);
      state.todosAll[index].title=title
      state.todosAll[index].text=text
      state.todosAll[index].priorityLevel=priorityLevel
      state.todosAll[index].dateLast=date
      state.todosAll[index].categoryId=categoryId
      state.todosAllStatus = "succes";
    },
    [updateOneTodo.rejected]: (state, action) => {
      state.todosAllStatus = "failed";
      state.todosAllError = action.error.message;
    },


    //completed
    [completed.pending]: (state, action) => {
      state.todosAllStatus = "loading";
    },
    [completed.fulfilled]: (state, action) => {
      const { id, completed} = action.payload;
      const index = state.todosAll.findIndex(todo => todo.id === id);
      state.todosAll[index].completed=completed
  
      state.todosAllStatus = "succes";
    },
    [completed.rejected]: (state, action) => {
      state.todosAllStatus = "failed";
      state.todosAllError = action.error.message;
    },


    //deleted

    //Deleted car

    [deleteOneTodo.pending]: (state, action) => {
      state.todosAllStatus = "loading";
    },
    [deleteOneTodo.fulfilled]: (state, action) => {
      const id = action.payload;
      const newCars = state.todosAll.filter((todo) => todo.id !== id);
      state.todosAll = newCars;
      state.todosAllError = "succes";
    },
    [deleteOneTodo.rejected]: (state, action) => {
      state.todosAllStatus = "failed";
      state.todosAllError = action.error.message;
    },







    //Add one todos
    [addOneTodo.pending]: (state, action) => {
      state.todosAllStatus = "loading";
    },
    [addOneTodo.fulfilled]: (state, action) => {
      state.todosAll.push(action.payload);
      state.todosAllStatus = "succes";
    },
    [addOneTodo.rejected]: (state, action) => {
      state.todosAllStatus = "failed";
      state.todosAllError = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const {searchFiltred,completedAll,noCompleted} = todoSlice.actions;

export default todoSlice.reducer;
