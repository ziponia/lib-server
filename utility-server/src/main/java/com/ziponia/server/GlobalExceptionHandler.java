package com.ziponia.server;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> runtimeExceptionHandler(Throwable t) {
        HashMap<String, Object> hm = new HashMap<>();
        hm.put("message", t.getMessage());
        return new ResponseEntity<>(hm, HttpStatus.FORBIDDEN);
    }
}
