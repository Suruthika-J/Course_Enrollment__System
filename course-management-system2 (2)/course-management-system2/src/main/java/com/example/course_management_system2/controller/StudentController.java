package com.example.course_management_system2.controller;

import com.example.course_management_system2.model.Student;
import com.example.course_management_system2.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {
        try {
            // Check if username already exists
            if (studentService.findByUsername(student.getUsername()) != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username already exists");
            }
            // Register the student
            studentService.registerStudent(student);
            return ResponseEntity.status(HttpStatus.CREATED)
                                 .body("Student registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("An error occurred");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, 
                                   @RequestParam String password) {
            Student student = studentService.login(username, password);
            if (student == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                    .body("Invalid username or password");
            }
            return ResponseEntity.ok(student);
        }
    }
