package com.nurullah.todolist.DTOs.request;

import lombok.Data;

@Data
public class CreateUserRequest {

    private String userName;
    private String email;
    private String password;

}
