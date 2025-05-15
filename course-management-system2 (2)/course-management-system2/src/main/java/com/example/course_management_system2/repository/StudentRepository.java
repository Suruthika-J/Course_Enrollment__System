package com.example.course_management_system2.repository;

import com.example.course_management_system2.model.Student;

import org.springframework.data.jpa.repository.JpaRepository;


public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByUsernameAndPassword(String username, String password);
    Student findByUsername(String username);
}