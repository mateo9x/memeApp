package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.entity.User;
import com.mateo9x.memeapp.mapper.UserMapper;
import com.mateo9x.memeapp.repository.UserRepository;
import com.mateo9x.memeapp.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userMapper.toDTO(userRepository.save(user));
    }

    @Override
    public Optional<UserDTO> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email)
                        .map(userMapper::toDTO);
    }

    @Override
    public Optional<UserDTO> getUserByUsername(String username) {
        return userRepository.findUserByUsername(username)
                .map(userMapper::toDTO);
    }

    @Override
    public Boolean doesBothPasswordsMatches(String dbPassword, String passwordTypedByUser) {
        return passwordEncoder.matches(passwordTypedByUser, dbPassword);
    }

    @Override
    public UserDTO getUserLogged() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findUserByUsername((String) authentication.getPrincipal())
                .map(userMapper::toDTO)
                .orElse(null);
    }
}
