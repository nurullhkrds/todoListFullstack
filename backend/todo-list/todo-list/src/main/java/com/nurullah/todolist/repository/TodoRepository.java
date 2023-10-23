package com.nurullah.todolist.repository;

import com.nurullah.todolist.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo,Integer> {
    List<Todo> findByCategoryId(Optional<Integer> categoryId);

    List<Todo> findByUserId(Optional<Integer> userId);

    List<Todo> findByCategoryIdAndUserId(Optional<Integer> categoryId, Optional<Integer> userId);

    List<Todo> findByUserIdOrderByDateLastAsc(Integer userId);
    List<Todo> findByUserIdOrderByDateLastDesc(Integer userId);
    List<Todo> findByUserIdOrderByPriorityLevelAsc(Integer userId);

    //////////////////

    List<Todo> findByUserIdAndDateLastFiltered(Integer userId,Date dueDate);
    List<Todo> findByUserIdAndPriorityLevel(Integer userId,Integer priority);

    List<Todo> findByUserIdAndDateLastFilteredAndPriorityLevel(Integer userId,Date dueDate, Integer priority);





}
