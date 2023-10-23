package com.nurullah.todolist.DTOs.response;

import com.nurullah.todolist.entities.Todo;
import lombok.Data;

import java.text.DateFormat;
import java.util.Date;

@Data
public class TodoResponse {

    private int id;
    private String title;

    private String text;

    private int priorityLevel;

    private int userId;
    private String userName;

    private Date dateLast;
    private Date dateCreated;

    private Boolean completed;


    public TodoResponse(Todo entity){
        this.id=entity.getId();
        this.title=entity.getTitle();
        this.text=entity.getText();
        this.dateLast=entity.getDateLast();
        this.dateCreated=entity.getDateCreated();
        this.priorityLevel=entity.getPriorityLevel();
        this.userName=entity.getUser().getUserName();
        this.userId=entity.getUser().getId();
        this.completed=entity.getCompleted();

    }

}
