package com.nurullah.todolist.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.text.DateFormat;
import java.util.Date;

@Table(name = "todos")
@Entity
@Data
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;


    @Column(columnDefinition = "text")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String text;

    private int priorityLevel;

    private Date dateLast;

    private Date dateCreated;

    private Boolean completed;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Category category;
}
