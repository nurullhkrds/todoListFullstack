package com.nurullah.todolist.bussines.abstractt;

import com.nurullah.todolist.DTOs.request.CreateUserRequest;
import com.nurullah.todolist.DTOs.request.UpdateUserRequest;
import com.nurullah.todolist.DTOs.request.UserRequestUpdateeee;
import com.nurullah.todolist.core.utilities.DataResult;
import com.nurullah.todolist.core.utilities.Result;
import com.nurullah.todolist.entities.User;

import java.util.List;

public interface IUserService {

    DataResult<List<User>> getAllUser();

    DataResult<User> getOneUserById(int userId);


    Result createOneUser(User user);

    DataResult<User> updateUser(int userId, UpdateUserRequest userUpdateRequest);

    DataResult<User> getByUserName(String userName);

    DataResult<User> updateUserr(int userId, UserRequestUpdateeee userRequestUpdateeee);
}
