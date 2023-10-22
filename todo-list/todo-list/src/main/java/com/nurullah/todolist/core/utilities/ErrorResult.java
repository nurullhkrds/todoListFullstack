package com.nurullah.todolist.core.utilities;

public class ErrorResult extends Result{

    public ErrorResult(String message) {
        super(false, message);
    }
}
