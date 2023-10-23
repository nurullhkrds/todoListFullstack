package com.nurullah.todolist.API;

import com.nurullah.todolist.DTOs.request.TodoAddRequest;
import com.nurullah.todolist.DTOs.request.TodoCompletedRequest;
import com.nurullah.todolist.DTOs.request.TodoUpdateRequest;
import com.nurullah.todolist.DTOs.response.TodoResponse;
import com.nurullah.todolist.bussines.abstractt.ITodoService;
import com.nurullah.todolist.core.utilities.DataResult;
import com.nurullah.todolist.core.utilities.SuccesDataResult;
import com.nurullah.todolist.entities.Todo;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;


import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todos")
public class TodosControllers {

    private final ITodoService todoService;

    public TodosControllers(ITodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public DataResult<List<TodoResponse>> getAllTodo
            (@RequestParam Optional<Integer> categoryId, @RequestParam Optional<Integer> userId) {

        return todoService.getAllTodo(categoryId, userId);
    }


    @GetMapping("/{todoId}")
    public DataResult<TodoResponse> getOneByTodoId(@PathVariable int todoId) {
        return todoService.getOneByTodoId(todoId);

    }

    @PostMapping
    public DataResult<TodoResponse> addOneTodo(@RequestBody TodoAddRequest todoAddRequest) {
        return todoService.addOneTodo(todoAddRequest);

    }

    @PutMapping("/{todoId}")
    public DataResult<TodoResponse> UpdateOneTodo(@RequestBody TodoUpdateRequest todoUpdateRequest, @PathVariable int todoId) {
        return todoService.UpdateOneTodo(todoUpdateRequest, todoId);

    }

    @PutMapping("/completed/{todoId}")
    public DataResult<TodoResponse> completed(@RequestBody TodoCompletedRequest todoCompletedRequest, @PathVariable int todoId) {
        return todoService.completed(todoCompletedRequest, todoId);

    }

    @DeleteMapping("/{todoId}")
    public DataResult<Integer> deletedTodoById(@PathVariable int todoId) {
        return todoService.deletedTodoById(todoId);

    }
    @GetMapping("/dateasc")
    public DataResult<List<TodoResponse>>getByDateSortingAsc(@RequestParam Integer userId){
        return todoService.getByDateSortingAsc(userId);

    }
    @GetMapping("/datedesc")
    public DataResult<List<TodoResponse>>getByDateSortingDesc(@RequestParam Integer userId){
        return todoService.getByDateSortingDesc(userId);

    }

    @GetMapping("/priotry")
    public DataResult<List<TodoResponse>>getByPriotrySorting(@RequestParam Integer userId){
        return todoService.getByPriotrySorting(userId);
    }

    @GetMapping("/filter")
    public DataResult<List<TodoResponse>> filterTasks
            (@RequestParam(name = "dueDate",required = false) String dueDate,
            @RequestParam(name = "priority",required = false) Integer priority,
             @RequestParam(name="userId")Integer userId) throws ParseException {
        return todoService.findByDueDateAndPriority(dueDate, priority,userId);
    }














}
