package com.nurullah.todolist.DTOs.request;

import lombok.Data;

import java.util.Date;

@Data
public class TodoUpdateRequest {

    private String title;

    private String text;

    private int priorityLevel;

    private Date date;

    private int categoryId;
}
