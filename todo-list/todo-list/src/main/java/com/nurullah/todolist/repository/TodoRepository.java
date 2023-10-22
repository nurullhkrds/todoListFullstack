package com.nurullah.todolist.repository;

import com.nurullah.todolist.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo,Integer> {
    List<Todo> findByCategoryId(Optional<Integer> categoryId);

    List<Todo> findByUserId(Optional<Integer> userId);

    List<Todo> findByCategoryIdAndUserId(Optional<Integer> categoryId, Optional<Integer> userId);


    List<Todo> findAllByOrderByDateLastAsc();
    List<Todo> findAllByOrderByDateLastDesc();
    List<Todo> findAllByOrderByPriorityLevelAsc();

    //////////////////
    List<Todo> findByDateLast(Date dueDate);
    List<Todo> findByPriorityLevel(int priority);

    List<Todo> findByDateLastAndPriorityLevel(Date dueDate, Integer priority);





}
