package com.example.msemployeur.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ExceptionHandler {


    public static ResponseEntity<Object> notAuthorizedExceptions(String msg){
        return ResponseHandler.generateErrorResponse(
                HttpStatus.BAD_REQUEST ,
                "NotAuthorizedExceptions",
                msg
        );
    }


    public static ResponseEntity<Object> itemNotFoundException(String msg){
        return ResponseHandler.generateErrorResponse(
                HttpStatus.BAD_REQUEST ,
                "ItemNotFoundException",
                msg
        );
    }

    public static ResponseEntity<Object> badRequestException(){
        return ResponseHandler.generateErrorResponse(
                HttpStatus.BAD_REQUEST ,
                "BadRequestException",
                "message"
        );

    }
}
