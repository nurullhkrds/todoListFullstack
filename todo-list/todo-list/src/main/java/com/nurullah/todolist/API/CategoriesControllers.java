package com.nurullah.todolist.API;


import com.nurullah.todolist.bussines.abstractt.ICategoryService;
import com.nurullah.todolist.core.utilities.DataResult;
import com.nurullah.todolist.core.utilities.Result;
import com.nurullah.todolist.entities.Category;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoriesControllers {

    private final ICategoryService categoryService;

    public CategoriesControllers(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public DataResult<List<Category>>getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/{categoryId}")
    public DataResult<Category>getOneById(@PathVariable int categoryId){
        return categoryService.getOneById(categoryId);
    }


    @PostMapping
    public Result createOneCategory(@RequestBody Category category){
        return categoryService.createOneCategory(category);
    }

    @DeleteMapping("/{categoryId}")
    public Result deleteOneCategory(@PathVariable int categoryId){
        return categoryService.deleteOneCategory(categoryId);
    }

}
