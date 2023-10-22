package com.nurullah.todolist.bussines.concretes;

import com.nurullah.todolist.DTOs.request.TodoAddRequest;
import com.nurullah.todolist.DTOs.request.TodoCompletedRequest;
import com.nurullah.todolist.DTOs.request.TodoUpdateRequest;
import com.nurullah.todolist.DTOs.response.TodoResponse;
import com.nurullah.todolist.bussines.abstractt.ICategoryService;
import com.nurullah.todolist.bussines.abstractt.ITodoService;
import com.nurullah.todolist.bussines.abstractt.IUserService;
import com.nurullah.todolist.core.utilities.DataResult;
import com.nurullah.todolist.core.utilities.ErrorDataResult;
import com.nurullah.todolist.core.utilities.SuccesDataResult;
import com.nurullah.todolist.entities.Category;
import com.nurullah.todolist.entities.Todo;
import com.nurullah.todolist.entities.User;
import com.nurullah.todolist.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TodoManager implements ITodoService {

    private final TodoRepository todoRepository;
    private final IUserService userService;
    private final ICategoryService categoryService;


    public TodoManager(TodoRepository todoRepository, IUserService userService, ICategoryService categoryService) {
        this.todoRepository = todoRepository;
        this.userService = userService;
        this.categoryService = categoryService;
    }

    @Override
    public DataResult<List<TodoResponse>> getAllTodo(Optional<Integer> categoryId, Optional<Integer> userId) {
        List<Todo> convertTodo;

        if (categoryId.isPresent() && userId.isPresent()){
            convertTodo=todoRepository.findByCategoryIdAndUserId(categoryId,userId);
            return new SuccesDataResult<>("Kullanıcı ve Kategoriye göre listlendi...",
                    convertTodo.stream().map(todo -> new TodoResponse(todo)).collect(Collectors.toList()));

        }

        else if (userId.isPresent()) {
            convertTodo=todoRepository.findByUserId(userId);
            return new SuccesDataResult<>
                    ("Kullanıcıya göre filtrelendi...",convertTodo.stream().map(todo -> new TodoResponse(todo)).collect(Collectors.toList()));


        }
        else if(categoryId.isPresent()){
            convertTodo=todoRepository.findByCategoryId(categoryId);
            return new SuccesDataResult<>
                    ("Kategoriye göre filtrelendi...",convertTodo.stream().map(todo -> new TodoResponse(todo)).collect(Collectors.toList()));

        }



        convertTodo=  todoRepository.findAll();
        return new SuccesDataResult<>
                ("Data Listelendi", convertTodo.stream().map(todo ->
                        new TodoResponse(todo)).collect(Collectors.toList()));

    }


    @Override
    public DataResult<TodoResponse> getOneByTodoId(int todoId) {
        Optional<Todo>todoTest=todoRepository.findById(todoId);
        if (todoTest.isPresent()){
            new SuccesDataResult<>("Data Getirildi",new TodoResponse(todoTest.get()));
        }
        return new ErrorDataResult<>("Data bulunamadı",null);
    }

    @Override
    public DataResult<TodoResponse> addOneTodo(TodoAddRequest todoAddRequest) {
        User userTest=userService.getOneUserById(todoAddRequest.getUserId()).getData();
        Category category=categoryService.getOneById(todoAddRequest.getCategoryId()).getData();
        if (userTest!=null){
            Todo todoToSave=new Todo();
            todoToSave.setUser(userTest);
            todoToSave.setText(todoAddRequest.getText());
            todoToSave.setTitle(todoAddRequest.getTitle());
            todoToSave.setPriorityLevel(todoAddRequest.getPriorityLevel());
            todoToSave.setCategory(category);
            todoToSave.setCompleted(false);
            todoToSave.setDateCreated(new Date());
            todoToSave.setDateLast(todoAddRequest.getDate());
            todoRepository.save(todoToSave);
            return new SuccesDataResult<>("Todo Eklendi",new TodoResponse(todoToSave));

        }


        return new ErrorDataResult<>("Todo eklenemedi",null);
    }

    @Override
    public DataResult<TodoResponse> UpdateOneTodo(TodoUpdateRequest todoUpdateRequest, int todoId) {
        Optional<Todo> todoTest=todoRepository.findById(todoId);
        Category categoryTest= categoryService.getOneById(todoUpdateRequest.getCategoryId()).getData();
        if(todoTest!=null){
            Todo todoToUpdate=todoTest.get();
            todoToUpdate.setText(todoUpdateRequest.getText());
            todoToUpdate.setTitle(todoUpdateRequest.getTitle());
            todoToUpdate.setDateLast(todoUpdateRequest.getDate());
            todoToUpdate.setPriorityLevel(todoUpdateRequest.getPriorityLevel());
            todoToUpdate.setCategory(categoryTest);
            todoRepository.save(todoToUpdate);
            return new SuccesDataResult<>("Güncellendi",new TodoResponse(todoToUpdate));


        }
        return new ErrorDataResult<>("Güncellenemedi",null);
    }

    @Override
    public DataResult<TodoResponse> completed(TodoCompletedRequest todoCompletedRequest, int todoId) {
        Optional<Todo> todoTest=todoRepository.findById(todoId);
        if(todoTest!=null){
            Todo todoToUpdate=todoTest.get();
            todoToUpdate.setCompleted(todoCompletedRequest.getCompleted());
            todoRepository.save(todoToUpdate);
            return new SuccesDataResult<>("Güncellendi",new TodoResponse(todoToUpdate));


        }
        return new ErrorDataResult<>("Güncellenemedi",null);
    }

    @Override
    public DataResult<Integer> deletedTodoById(int todoId) {
        Optional<Todo> todoTest=todoRepository.findById(todoId);
        if (todoTest.isPresent()){
            todoRepository.deleteById(todoId);
            return new SuccesDataResult<>("Data silindi...",todoId);
        }
        return new ErrorDataResult<>("Data bulunamadı...",null);
    }

    @Override
    public DataResult<List<TodoResponse>> getByDateSortingAsc() {
        List<Todo>list=todoRepository.findAllByOrderByDateLastAsc();
        return new SuccesDataResult<>("listelendi",
                list.stream().map(todo -> new TodoResponse(todo)).collect(Collectors.toList()));
    }

    @Override
    public DataResult<List<TodoResponse>> getByDateSortingDesc() {
        List<Todo>list=todoRepository.findAllByOrderByDateLastDesc();
        return new SuccesDataResult<>("listelendi",
                list.stream().map(todo -> new TodoResponse(todo)).collect(Collectors.toList()));

    }

    @Override
    public DataResult<List<TodoResponse>> getByPriotrySorting() {
        List<Todo> list=todoRepository.findAllByOrderByPriorityLevelAsc();
        return new SuccesDataResult<>("listelendi",
                list.stream().map(todo -> new TodoResponse(todo)).collect(Collectors.toList()));
    }

    @Override
    public DataResult<List<TodoResponse>> findByDueDateAndPriority(Date dueDate, Integer priority) {
        List<Todo> list=null;
        if (dueDate != null && priority != null) {
             list=todoRepository.findByDateLastAndPriorityLevel(dueDate, priority);
        } else if (dueDate != null) {
             list=todoRepository.findByDateLast(dueDate);
             System.out.println(dueDate);
        } else if (priority != null) {
             list=todoRepository.findByPriorityLevel(priority);
        }
        return new SuccesDataResult<>("Listelendi",list.stream().map(todo -> new TodoResponse(todo)).collect(Collectors.toList()));
    }


}
