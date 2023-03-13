package com.mateo9x.memeapp.service;

import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.record.UserNewPasswordRequest;

import java.util.Optional;

public interface UserService {

   UserDTO saveUser(UserDTO userDTO);
   UserDTO updateUser(UserDTO userDTO);
   Optional<UserDTO> getUserByUsername(String username);
   Optional<UserDTO> getUserByEmail(String email);
   Boolean doesBothPasswordsMatches(String dbPassword, String passwordTypedByUser);
   UserDTO getUserLogged();

   void startResetPasswordProcedure(String email);

   UserDTO getUserByResetToken(String resetToken);

   void finishResetPasswordProcedure(UserNewPasswordRequest userNewPasswordRequest);

   boolean updateUserPassword(Long userId, String password);
}
