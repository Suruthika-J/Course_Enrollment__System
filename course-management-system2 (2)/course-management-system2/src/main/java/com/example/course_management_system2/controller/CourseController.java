package com.example.course_management_system2.controller;

import com.example.course_management_system2.model.Course;
import com.example.course_management_system2.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseService.addCourse(course);
    }

    @GetMapping("/department/{department}")
    public List<Course> getByDepartment(@PathVariable String department) {
        return courseService.getCoursesByDepartment(department);
    }
}