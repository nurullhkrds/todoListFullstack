package com.nurullah.todolist.bussines.concretes;

import com.nurullah.todolist.DTOs.request.CreateUserRequest;
import com.nurullah.todolist.DTOs.request.UpdateUserRequest;
import com.nurullah.todolist.DTOs.request.UserRequestUpdateeee;
import com.nurullah.todolist.bussines.abstractt.IUserService;
import com.nurullah.todolist.core.utilities.*;
import com.nurullah.todolist.entities.User;
import com.nurullah.todolist.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserManager implements IUserService {
     private final UserRepository userRepository;

    public UserManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public DataResult<List<User>> getAllUser() {

        return new SuccesDataResult<List<User>>("Data getirildi",userRepository.findAll());
    }

    @Override
    public DataResult<User> getOneUserById(int userId) {
        Optional<User>userTest=userRepository.findById(userId);
        if (userTest.isPresent()){
            return new SuccesDataResult<User>("Kullanıcı getirildi",userTest.get());
        }

        return new ErrorDataResult<User>("Böyle bir kullanıcı yok",null);
    }


    @Override
    public DataResult<User> getByUserName(String userName) {

        return new SuccesDataResult<User>
                ("Veri getirildi",userRepository.findByUserName(userName));

    }



    @Override
    public Result createOneUser(User user) {

        User userTest=userRepository.save(user);
        if (userTest==null){
            return new ErrorResult("Kullanıcı Eklenemedi !");

        }
        return new SuccessResult("Kullanıcı Başarıyla Eklendi");
    }

    @Override
    public DataResult<User> updateUser(int userId, UpdateUserRequest userUpdateRequest) {
        Optional<User> userTest = userRepository.findById(userId);
        if (userTest.isPresent()) {
            User userToUpdate=userTest.get();
            userToUpdate.setAvatar(userUpdateRequest.getAvatar());
            userRepository.save(userToUpdate);
            return new SuccesDataResult<User>("Güncellendi",userToUpdate);

        }
        return new ErrorDataResult<>("Güncellenemedi...!",null);
    }

    @Override
    public DataResult<User> updateUserr(int userId, UserRequestUpdateeee userRequestUpdateeee) {
        Optional<User> userTest = userRepository.findById(userId);
        if (userTest.isPresent()) {
            User userToUpdate=userTest.get();
            userToUpdate.setUserName(userRequestUpdateeee.getUserName());
            userToUpdate.setEmail(userRequestUpdateeee.getEmail());
            userRepository.save(userToUpdate);
            return new SuccesDataResult<User>("Güncellendi",userToUpdate);

        }
        return new ErrorDataResult<>("Güncellenemedi...!",null);
    }


}
