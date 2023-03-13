package com.mateo9x.memeapp.controller;

import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.exception.UserException;
import com.mateo9x.memeapp.record.UserNewPasswordRequest;
import com.mateo9x.memeapp.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<UserDTO> saveUser(@RequestBody @Valid UserDTO userDTO) {
        log.info("REST request to save user: {}", userDTO);
        if (userService.getUserByUsername(userDTO.getUsername()).isPresent()) {
            throw new UserException("User with this username already exists!");
        }
        if (userService.getUserByEmail(userDTO.getEmail()).isPresent()) {
            throw new UserException("User with this email already exists!");
        }
        return ResponseEntity.ok(userService.saveUser(userDTO));
    }

    @PutMapping("/users")
    public ResponseEntity<UserDTO> updateUser(@RequestBody @Valid UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(userDTO));
    }

    @GetMapping("/users/user-logged")
    public ResponseEntity<UserDTO> getUserLogged() {
        log.info("REST request to get user logged");
        return ResponseEntity.ok(userService.getUserLogged());
    }

    @GetMapping("/users/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        log.info("REST request to get user by email: {}", email);
        return ResponseEntity.ok(userService.getUserByEmail(email).orElse(null));
    }

    @GetMapping("/users/username/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        log.info("REST request to get user by username: {}", username);
        return ResponseEntity.ok(userService.getUserByUsername(username).orElse(null));
    }

    @GetMapping(value = "/users/reset-password/start/{email}", produces = "application/json")
    public void startResetPasswordProcedure(@PathVariable String email) {
        log.info("REST request to start reset password procedure for email: {}", email);
        userService.startResetPasswordProcedure(email);
    }

    @GetMapping("/users/reset-token/{resetToken}")
    public ResponseEntity<UserDTO> getUserByResetToken(@PathVariable String resetToken) {
        log.info("REST request to get user by reset token: {}", resetToken);
        return ResponseEntity.ok(userService.getUserByResetToken(resetToken));
    }

    @PutMapping("/users/reset-password/finish")
    public void finishResetPasswordProcedure(@RequestBody @Valid UserNewPasswordRequest userNewPasswordRequest) {
        log.info("REST request to finish reset password procedure for email: {}", userNewPasswordRequest.email());
        userService.finishResetPasswordProcedure(userNewPasswordRequest);
    }

    @PutMapping("/users/{userId}/update-password/{password}")
    public ResponseEntity<Boolean> updateUserPassword(@PathVariable Long userId, @PathVariable String password) {
        return ResponseEntity.ok(userService.updateUserPassword(userId, password));
    }

}
