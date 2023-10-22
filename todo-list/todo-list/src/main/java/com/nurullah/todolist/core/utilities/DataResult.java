package com.nurullah.todolist.core.utilities;

public class DataResult <T> extends Result{
    private T data;


    public DataResult(boolean success, String message,T data) {
        super(success, message);
        this.data=data;
    }



    public T getData() {
        return this.data;
    }
}
