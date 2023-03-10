package com.mateo9x.memeapp.service;

import com.mateo9x.memeapp.dto.UserDTO;

import java.util.Optional;

public interface UserService {

   UserDTO saveUser(UserDTO userDTO);
   Optional<UserDTO> getUserByUsername(String username);
   Optional<UserDTO> getUserByEmail(String email);
   Boolean doesBothPasswordsMatches(String dbPassword, String passwordTypedByUser);
   UserDTO getUserLogged();
}
