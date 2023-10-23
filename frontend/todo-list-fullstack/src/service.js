import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

//Category
export const getAllCategories=createAsyncThunk('category/getAllCategories',async ()=>{
    const data=await axios.get(`/categories`)
    return data.data.data
})



//Todoss
export const getAllTodosUserId=createAsyncThunk('todos/getAllTodos',async ()=>{
    const data=await axios.get(`/todos?userId=${parseInt(localStorage.getItem("currentUserId"))}`)
    return data.data.data
})

export const getAllTodosCategory=createAsyncThunk('todos/getAllTodosCategory',async (categoryId)=>{
    const data=await axios.get(`/todos?categoryId=${categoryId}&&userId=${parseInt(localStorage.getItem("currentUserId"))}`)
    return data.data.data
})


export const addOneTodo=createAsyncThunk('todos/addOneTodo',async (todo)=>{
    const data=await axios.post(`/todos`,todo)
    return data.data.data
})


export const updateOneTodo=createAsyncThunk('todos/updateOneTodo',async (update)=>{
    const updateObj={title:update.title,text:update.text,priorityLevel:update.priorityLevel,date:update.date,categoryId:update.categoryId}
    const data=await axios.put(`/todos/${update.id}`,updateObj,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    
    return data.data.data
  
})

export const completedService=createAsyncThunk('todos/completed',async (update)=>{
    const updateObj={completed:update.completed}
    const data=await axios.put(`/todos/completed/${update.id}`,updateObj,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    
    return data.data.data
  
})


export const deleteOneTodo=createAsyncThunk('todos/deleteOneTodo',async (todoId)=>{
    const data=await axios.delete(`/todos/${todoId}`,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
    return data.data.data
}) 





export const sortingPriotry=createAsyncThunk('todos/sortingPriotry',async ()=>{
    const data=await axios.get(`/todos/priotry?userId=${parseInt(localStorage.getItem("currentUserId"))}`)
    return data.data.data
})
export const dateasc=createAsyncThunk('todos/dateasc',async ()=>{
    const data=await axios.get(`/todos/dateasc?userId=${parseInt(localStorage.getItem("currentUserId"))}`)
    return data.data.data
})
export const datedesc=createAsyncThunk('todos/datedesc',async ()=>{
    const data=await axios.get(`/todos/datedesc?userId=${parseInt(localStorage.getItem("currentUserId"))}`)
    return data.data.data
})

//filtered
export const filterPriotry=createAsyncThunk('todos/filterDateAndPriotry',async (priotry)=>{
    const data=await axios.get(`/todos/filter?userId=${parseInt(localStorage.getItem("currentUserId"))}&priority=${priotry}`)
    return data.data.data
})

export const filterDate=createAsyncThunk('todos/filterDate',async (date)=>{
    const data=await axios.get(`/todos/filter?userId=${parseInt(localStorage.getItem("currentUserId"))}&dueDate=${date}`)
    return data.data.data
})

export const filterDateAndPriotry=createAsyncThunk('todos/filterDateAndPriotry',async (filter)=>{
    console.log(filter);
    const {dueDate,priority}=filter;
    const data=await axios.get(`/todos/filter?userId=${parseInt(localStorage.getItem("currentUserId"))}&dueDate=${dueDate}&priority=${priority}`)
    return data.data.data
})






//user procces

export const getOneByUserId=createAsyncThunk('users/getOneByUserId',async (userId)=>{
    const data=await axios.get(`/users/${userId}`)
    return data.data.data
})


export const updateUserAsync=createAsyncThunk('auth/updateUserAsync',async (avatar)=>{
    
    const data=await axios.put(`/users/${localStorage.getItem("currentUserId")}`,avatar,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
   
    
    return data.data.data;
})


export const updateUserrAsync=createAsyncThunk('auth/updateUserrAsync',async (update)=>{
    
    const data=await axios.put(`/users/user/${parseInt(localStorage.getItem("currentUserId"))}`,update,{
        headers:{
            Authorization:localStorage.getItem("token"),
          },
    })
   
    return data.data.data;
})









//Auth login and register

//register
export const registerAuth=createAsyncThunk('auth/registerAuth',async (register)=>{

    const data=await axios.post(`/auth/register`,register)
    return data.data
})


//login

export const loginAuth=createAsyncThunk('auth/loginAuth',async (login)=>{
    const data=await axios.post(`/auth/login`,login)
    localStorage.setItem("token",data.data.message)
    localStorage.setItem("currentUserId",data.data.userId)
    localStorage.setItem("currentUserName",data.data.userName)
    return data.data

})

