package com.example.course_management_system2.service;

import com.example.course_management_system2.model.Student;
import com.example.course_management_system2.repository.StudentRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student login(String username, String password) {
        return studentRepository.findByUsernameAndPassword(username, password);
    }

    public Student findByUsername(String username) {
        return studentRepository.findByUsername(username);
    }
}