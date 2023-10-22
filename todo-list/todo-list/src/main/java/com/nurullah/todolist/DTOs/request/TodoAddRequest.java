package com.nurullah.todolist.DTOs.request;

import com.nurullah.todolist.entities.Category;
import com.nurullah.todolist.entities.User;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

import java.text.DateFormat;
import java.util.Date;

@Data
public class TodoAddRequest {


    private String title;

    private String text;

    private int priorityLevel;

    private Date date;

    private int userId;

    private int categoryId;


}
