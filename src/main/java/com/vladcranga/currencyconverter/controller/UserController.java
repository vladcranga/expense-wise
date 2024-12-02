package com.vladcranga.currencyconverter.controller;

import com.vladcranga.currencyconverter.model.User;
import com.vladcranga.currencyconverter.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User loginRequest) {
        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
        if (user.isPresent()) {
            if (passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful.");
                response.put("userId", user.get().getId());
                response.put("baseCurrency", user.get().getBaseCurrency());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(
                    HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials."));
            }
        }
        return ResponseEntity.status(
            HttpStatus.NOT_FOUND).body(Map.of("message", "User not found."));
    }    
}
