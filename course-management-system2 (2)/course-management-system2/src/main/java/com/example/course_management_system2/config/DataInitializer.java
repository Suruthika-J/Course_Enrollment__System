package com.example.course_management_system2.config;

import com.example.course_management_system2.model.Student;
import com.example.course_management_system2.service.StudentService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    @Autowired
    private StudentService studentService;

    @PostConstruct
    public void init() {
        // Create a default student user if not exists
        String defaultUsername = "student1";
        String defaultPassword = "password123";

        Student existingStudent = studentService.login(defaultUsername, defaultPassword);
        if (existingStudent == null) {
            Student student = new Student();
            student.setUsername(defaultUsername);
            student.setPassword(defaultPassword);
            student.setName("Default Student");
            student.setEmail("student1@example.com");
            student.setDepartment("Computer Science");
            student.setStudentId("S1001");
            student.setCgpa(0.0);
            studentService.registerStudent(student);
        }
    }
}
