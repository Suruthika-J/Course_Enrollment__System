package com.example.course_management_system2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.course_management_system2.model.Enrollment;
import com.example.course_management_system2.repository.EnrollmentRepository;

@Service
@Transactional
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public Enrollment enroll(Enrollment enrollment) {
        // Validate student exists
        if(enrollment.getStudent() == null || enrollment.getStudent().getId() == null) {
            throw new IllegalArgumentException("Student must be specified");
        }
        
        // Validate course exists
        if(enrollment.getCourse() == null || enrollment.getCourse().getId() == null) {
            throw new IllegalArgumentException("Course must be specified");
        }
        
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getStudentEnrollments(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }
}