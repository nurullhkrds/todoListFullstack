package com.nurullah.todolist.API;

import com.nurullah.todolist.DTOs.request.CreateUserRequest;
import com.nurullah.todolist.DTOs.request.LoginRequest;
import com.nurullah.todolist.DTOs.response.AuthResponse;
import com.nurullah.todolist.bussines.abstractt.IUserService;
import com.nurullah.todolist.entities.User;
import com.nurullah.todolist.security.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthControllers {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final IUserService userService;

    private final PasswordEncoder passwordEncoder;


    public AuthControllers(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, IUserService userService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);
        User user=userService.getByUserName(loginRequest.getUserName()).getData();
        AuthResponse authResponse=new AuthResponse();
        authResponse.setMessage("Bearer "+jwtToken);
        authResponse.setUserId(user.getId());
        authResponse.setUserName(user.getUserName());
        return authResponse;

    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody CreateUserRequest registerRequest) {
        AuthResponse authResponse=new AuthResponse();
        if(userService.getByUserName(registerRequest.getUserName()).getData() != null) {
            authResponse.setMessage("Böyle bir kullanıcı zaten var");
            return  authResponse;
        }
        User user = new User();
        user.setUserName(registerRequest.getUserName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        userService.createOneUser(user);
        authResponse.setUserId(user.getId());
        authResponse.setUserName(user.getUserName());
        authResponse.setMessage("Kullanıcı Başarıyla Oluşturuldu");
        return authResponse;


    }





}
