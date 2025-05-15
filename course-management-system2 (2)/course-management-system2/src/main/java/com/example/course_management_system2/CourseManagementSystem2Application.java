package com.example.course_management_system2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.example.course_management_system2.model")
public class CourseManagementSystem2Application {
    public static void main(String[] args) {
        SpringApplication.run(CourseManagementSystem2Application.class, args);
    }
}