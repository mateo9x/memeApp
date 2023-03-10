package com.mateo9x.memeapp.controller;

import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.exception.UserException;
import com.mateo9x.memeapp.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @GetMapping("/users/user-logged")
    public ResponseEntity<UserDTO> getUserLogged() {
        log.info("REST request to get user logged");
        return ResponseEntity.ok(userService.getUserLogged());
    }
}
