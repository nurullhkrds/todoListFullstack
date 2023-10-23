package com.nurullah.todolist.bussines.abstractt;

import com.nurullah.todolist.core.utilities.DataResult;
import com.nurullah.todolist.core.utilities.Result;
import com.nurullah.todolist.entities.Category;

import java.util.List;

public interface ICategoryService {
    DataResult<List<Category>> getAllCategories();

    DataResult<Category> getOneById(int categoryId);

    Result createOneCategory(Category category);

    Result deleteOneCategory(int categoryId);

}
