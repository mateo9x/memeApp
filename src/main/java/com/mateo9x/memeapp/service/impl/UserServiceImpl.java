package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.entity.User;
import com.mateo9x.memeapp.mapper.UserMapper;
import com.mateo9x.memeapp.record.UserNewPasswordRequest;
import com.mateo9x.memeapp.repository.UserRepository;
import com.mateo9x.memeapp.service.FileService;
import com.mateo9x.memeapp.service.MailService;
import com.mateo9x.memeapp.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

import static java.util.Objects.isNull;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final MailService mailService;
    private final FileService fileService;

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDTO = userMapper.toDTO(userRepository.save(user));
        mailService.sendWelcomeNewUserEmail(userDTO);
        return userDTO;
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        UserDTO userDTOSaved = userMapper.toDTO(userRepository.save(user));
        getUserIcon(userDTOSaved);
        return userDTOSaved;
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
                .map(this::getUserIcon)
                .orElse(null);
    }

    @Override
    @Transactional
    public void startResetPasswordProcedure(String email) {
        Optional<User> userOptional = userRepository.findUserByEmail(email);
        userOptional.ifPresent(this::generateResetPassword);
    }

    private void generateResetPassword(User user) {
        user.setResetToken(UUID.randomUUID().toString());
        mailService.sendResetPasswordEmail(userMapper.toDTO(user));
        userRepository.save(user);
    }

    @Override
    public UserDTO getUserByResetToken(String resetToken) {
        return userRepository.findUserByResetToken(resetToken)
                .map(userMapper::toDTO)
                .orElse(null);
    }

    @Override
    public void finishResetPasswordProcedure(UserNewPasswordRequest userNewPasswordRequest) {
        Optional<User> userOptional = userRepository.findUserByEmail(userNewPasswordRequest.email());
        userOptional.ifPresent(user -> finishResetPasswordProcedure(user, userNewPasswordRequest.password()));
    }

    @Override
    public boolean updateUserPassword(Long userId, String password) {
        User user = userRepository.findById(userId).orElse(null);
        if (isNull(user)) {
            return false;
        }
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return true;
    }

    private void finishResetPasswordProcedure(User user, String newPassword) {
        user.setResetToken(null);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private UserDTO getUserIcon(UserDTO userDTO) {
        userDTO.setIconFile(fileService.getMemeAuthorIconFromResourceFolder(userDTO.getPhotoUrl()));
        return userDTO;
    }
}
