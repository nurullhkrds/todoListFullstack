package com.nurullah.todolist.bussines.abstractt;

import com.nurullah.todolist.DTOs.request.TodoAddRequest;
import com.nurullah.todolist.DTOs.request.TodoCompletedRequest;
import com.nurullah.todolist.DTOs.request.TodoUpdateRequest;
import com.nurullah.todolist.DTOs.response.TodoResponse;
import com.nurullah.todolist.core.utilities.DataResult;
import com.nurullah.todolist.entities.Todo;

import java.text.DateFormat;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ITodoService {
    DataResult<List<TodoResponse>> getAllTodo(Optional<Integer> categoryId, Optional<Integer> userId);

    DataResult<TodoResponse> getOneByTodoId(int todoId);

    DataResult<TodoResponse> addOneTodo(TodoAddRequest todoAddRequest);

    DataResult<TodoResponse> UpdateOneTodo(TodoUpdateRequest todoUpdateRequest, int todoId);

    DataResult<TodoResponse> completed(TodoCompletedRequest todoCompletedRequest, int todoId);

    DataResult<Integer> deletedTodoById(int todoId);


    DataResult<List<TodoResponse>> getByDateSortingAsc(Integer userId);

    DataResult<List<TodoResponse>> getByDateSortingDesc(Integer userId);


    DataResult<List<TodoResponse>> getByPriotrySorting(Integer userId);

    DataResult<List<TodoResponse>> findByDueDateAndPriority(String dueDate, Integer priority,Integer userId) throws ParseException;
}


