package com.nurullah.todolist.bussines.concretes;

import com.nurullah.todolist.bussines.abstractt.ICategoryService;
import com.nurullah.todolist.core.utilities.*;
import com.nurullah.todolist.entities.Category;
import com.nurullah.todolist.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryManager implements ICategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryManager(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public DataResult<List<Category>> getAllCategories() {

        return new SuccesDataResult<>("Data listelendi...",categoryRepository.findAll());
    }

    @Override
    public DataResult<Category> getOneById(int categoryId) {
        Optional<Category>categoryTest=categoryRepository.findById(categoryId);
        if (categoryTest.isPresent()){
            return new SuccesDataResult<>("Data getirildi",categoryTest.get());
        }
        return new ErrorDataResult<>("Data bulunamadı",null);
    }

    @Override
    public Result createOneCategory(Category category) {
        categoryRepository.save(category);
        return new SuccessResult("Category Eklendi...");
    }

    @Override
    public Result deleteOneCategory(int categoryId) {
        categoryRepository.deleteById(categoryId);
        return new SuccessResult("Category Silindi...");
    }


}
