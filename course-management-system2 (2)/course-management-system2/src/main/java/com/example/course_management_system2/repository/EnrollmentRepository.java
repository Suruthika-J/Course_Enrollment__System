package com.example.course_management_system2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.course_management_system2.model.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentId(Long studentId);
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
}
