package com.nurullah.todolist.API;


import com.nurullah.todolist.DTOs.request.CreateUserRequest;
import com.nurullah.todolist.DTOs.request.UpdateUserRequest;
import com.nurullah.todolist.DTOs.request.UserRequestUpdateeee;
import com.nurullah.todolist.bussines.abstractt.IUserService;
import com.nurullah.todolist.core.utilities.DataResult;
import com.nurullah.todolist.core.utilities.Result;
import com.nurullah.todolist.entities.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/users")
public class UsersControllers {


    private final IUserService userService;

    public UsersControllers(IUserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public DataResult<List<User>> getAllUsers(){
        return userService.getAllUser();
    }

    @GetMapping("/{userId}")
    public DataResult<User> getById(@PathVariable int userId){
        return userService.getOneUserById(userId);

    }

    @PostMapping
    public Result createOneUser(@RequestBody User user){
        return userService.createOneUser(user);
    }


    @PutMapping("/{userId}")
    public DataResult<User> updateUser(@PathVariable int userId, @RequestBody UpdateUserRequest userUpdateRequest){
        return userService.updateUser(userId,userUpdateRequest);

    }


    @PutMapping("/user/{userId}")
    public DataResult<User> updateUserr(@PathVariable int userId, @RequestBody UserRequestUpdateeee userRequestUpdateeee){
        return userService.updateUserr(userId,userRequestUpdateeee);

    }


}
