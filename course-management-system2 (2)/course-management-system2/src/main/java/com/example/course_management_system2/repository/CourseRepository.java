package com.example.course_management_system2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.course_management_system2.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByDepartment(String department);
    Course findByCode(String code);
    boolean existsByCode(String code);
}