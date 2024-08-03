package com.example.msemployeur.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {

    public static ResponseEntity<Object> generateResponse(String message, Object respose) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("body", respose);
        return new ResponseEntity<Object>(map, HttpStatus.ACCEPTED);


    }


    public static ResponseEntity<Object> generateErrorResponse(HttpStatus status,String code, String message) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("code", code);
        map.put("message", message);
        return new ResponseEntity<Object>(map,status);
    }
}
