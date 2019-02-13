package com.hkb.shoppingcart.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserNameExistsException extends RuntimeException  {
    public UserNameExistsException(String username){
        super("An account with the username '" + username + "' already exists");
    }
}

