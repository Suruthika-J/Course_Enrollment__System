// Student Dashboard Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mock data for courses (same as admin but without enrolled count)
    const allCourses = [
        { id: 1, name: 'Introduction to Computer Science', code: 'CS101', department: 'Computer Science', credits: 3, capacity: 30, description: 'Fundamentals of computer science and programming.' },
        { id: 2, name: 'Data Structures', code: 'CS201', department: 'Computer Science', credits: 4, capacity: 25, description: 'Study of fundamental data structures and algorithms.' },
        { id: 3, name: 'Circuit Theory', code: 'EE101', department: 'Electrical Engineering', credits: 3, capacity: 35, description: 'Basic principles of electrical circuits.' },
        { id: 4, name: 'Thermodynamics', code: 'ME201', department: 'Mechanical Engineering', credits: 4, capacity: 30, description: 'Study of energy and heat transfer.' },
        { id: 5, name: 'Calculus I', code: 'MATH101', department: 'Mathematics', credits: 4, capacity: 40, description: 'Introduction to differential and integral calculus.' },
        { id: 6, name: 'Database Systems', code: 'CS301', department: 'Computer Science', credits: 4, capacity: 25, description: 'Design and implementation of database systems.' },
        { id: 7, name: 'Digital Electronics', code: 'EE201', department: 'Electrical Engineering', credits: 3, capacity: 30, description: 'Fundamentals of digital circuits and systems.' },
        { id: 8, name: 'Fluid Mechanics', code: 'ME301', department: 'Mechanical Engineering', credits: 4, capacity: 25, description: 'Study of fluid behavior and applications.' }
    ];
    
    // Mock data for current student
    const studentName = localStorage.getItem('studentName') || 'Student';
    document.getElementById('student-name').textContent = studentName;
    
    let enrolledCourses = ['CS101', 'CS201']; // Initially enrolled courses
    let completedCourses = [
        { code: 'MATH100', name: 'Pre-Calculus', semester: 'Spring 2023', credits: 3, grade: 'A' },
        { code: 'PHYS101', name: 'Physics I', semester: 'Fall 2022', credits: 4, grade: 'B+' }
    ];
    
    // Update student dashboard stats
    function updateStudentStats() {
        document.getElementById('enrolled-courses-count').textContent = enrolledCourses.length;
        
        // Calculate current credits
        const currentCredits = enrolledCourses.reduce((total, code) => {
            const course = allCourses.find(c => c.code === code);
            return total + (course ? course.credits : 0);
        }, 0);
        
        document.getElementById('current-credits').textContent = currentCredits;
        
        // Calculate GPA (mock)
        const gpa = 3.75; // This would be calculated from completed courses in a real app
        document.getElementById('student-gpa').textContent = gpa.toFixed(2);
        
        // Update upcoming deadlines
        const deadlinesList = document.getElementById('deadlines-list');
        deadlinesList.innerHTML = '';
        
        const mockDeadlines = [
            { course: 'CS201', task: 'Assignment 3', due: 'Tomorrow' },
            { course: 'MATH101', task: 'Midterm Exam', due: 'Next Week' },
            { course: 'CS101', task: 'Project Proposal', due: 'In 2 Weeks' }
        ];
        
        mockDeadlines.forEach(deadline => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="deadline-course">${deadline.course}</span>
                <span class="deadline-task">${deadline.task}</span>
                <span class="deadline-due">${deadline.due}</span>
            `;
            deadlinesList.appendChild(li);
        });
    }
    
    // Render available courses
    function renderAvailableCourses() {
        const grid = document.getElementById('available-courses-grid');
        grid.innerHTML = '';
        
        allCourses.forEach(course => {
            const isEnrolled = enrolledCourses.includes(course.code);
            
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <div class="course-card-header">
                    <h4 class="course-card-title">${course.name}</h4>
                    <div class="course-card-meta">
                        <span>${course.code}</span>
                        <span>${course.credits} Credits</span>
                    </div>
                </div>
                <div class="course-card-body">
                    <p>${course.description}</p>
                    <div class="course-card-footer">
                        <span>${course.department}</span>
                        <button class="btn btn-primary view-details-btn" data-id="${course.id}">
                            ${isEnrolled ? 'Enrolled' : 'View Details'}
                        </button>
                    </div>
                </div>
            `;
            
            grid.appendChild(card);
        });
        
        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const courseId = parseInt(this.getAttribute('data-id'));
                showCourseDetails(courseId);
            });
        });
    }
    
    // Render current courses
    function renderCurrentCourses() {
        const tbody = document.querySelector('#current-courses-table tbody');
        tbody.innerHTML = '';
        
        enrolledCourses.forEach(code => {
            const course = allCourses.find(c => c.code === code);
            if (course) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${course.code}</td>
                    <td>${course.name}</td>
                    <td>${course.department}</td>
                    <td>${course.credits}</td>
                    <td>Dr. Professor</td>
                    <td>-</td>
                    <td>
                        <button class="btn btn-danger drop-btn" data-code="${course.code}">Drop</button>
                    </td>
                `;
                tbody.appendChild(tr);
            }
        });
        
        // Add event listeners to drop buttons
        document.querySelectorAll('.drop-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const courseCode = this.getAttribute('data-code');
                dropCourse(courseCode);
            });
        });
    }
    
    // Render completed courses
    function renderCompletedCourses() {
        const tbody = document.querySelector('#completed-courses-table tbody');
        tbody.innerHTML = '';
        
        completedCourses.forEach(course => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${course.code}</td>
                <td>${course.name}</td>
                <td>${course.semester}</td>
                <td>${course.credits}</td>
                <td>${course.grade}</td>
            `;
            tbody.appendChild(tr);
        });
    }
    
    // Show course details
    function showCourseDetails(courseId) {
        const course = allCourses.find(c => c.id === courseId);
        if (!course) return;
        
        const modal = document.getElementById('course-details-modal');
        const isEnrolled = enrolledCourses.includes(course.code);
        
        // Fill course details
        document.getElementById('course-modal-title').textContent = course.name;
        document.getElementById('course-detail-code').textContent = course.code;
        document.getElementById('course-detail-dept').textContent = course.department;
        document.getElementById('course-detail-credits').textContent = course.credits;
        document.getElementById('course-detail-capacity').textContent = `${course.capacity} students`;
        document.getElementById('course-detail-description').textContent = course.description;
        
        // Set up enroll/drop button
        const enrollBtn = document.getElementById('enroll-btn');
        const cancelBtn = document.getElementById('cancel-enroll-btn');
        
        if (isEnrolled) {
            enrollBtn.style.display = 'none';
            cancelBtn.style.display = 'inline-block';
            cancelBtn.setAttribute('data-code', course.code);
        } else {
            enrollBtn.style.display = 'inline-block';
            cancelBtn.style.display = 'none';
            enrollBtn.setAttribute('data-code', course.code);
        }
        
        // Show modal
        modal.classList.add('active');
    }
    
    // Enroll in course
    document.getElementById('enroll-btn').addEventListener('click', function() {
        const courseCode = this.getAttribute('data-code');
        enrollCourse(courseCode);
    });
    
    // Drop course
    document.getElementById('cancel-enroll-btn').addEventListener('click', function() {
        const courseCode = this.getAttribute('data-code');
        dropCourse(courseCode);
    });
    
    // Enroll in a course
    function enrollCourse(courseCode) {
        if (!enrolledCourses.includes(courseCode)) {
            enrolledCourses.push(courseCode);
            showToast('Successfully enrolled in course', 'success');
            
            // Close modal and refresh views
            document.getElementById('course-details-modal').classList.remove('active');
            updateStudentStats();
            renderAvailableCourses();
            renderCurrentCourses();
        }
    }
    
    // Drop a course
    function dropCourse(courseCode) {
        if (confirm('Are you sure you want to drop this course?')) {
            enrolledCourses = enrolledCourses.filter(code => code !== courseCode);
            showToast('Course dropped successfully', 'success');
            
            updateStudentStats();
            renderAvailableCourses();
            renderCurrentCourses();
        }
    }
    
    // Filter courses by department
    document.getElementById('department-filter').addEventListener('change', function() {
        const department = this.value;
        filterCourses(department);
    });
    
    // Search courses
    document.getElementById('course-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterCourses(null, searchTerm);
    });
    
    // Filter courses by department and/or search term
    function filterCourses(department = null, searchTerm = '') {
        let filtered = allCourses;
        
        if (department) {
            filtered = filtered.filter(course => course.department === department);
        }
        
        if (searchTerm) {
            filtered = filtered.filter(course => 
                course.name.toLowerCase().includes(searchTerm) || 
                course.code.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm)
            );
        }
        
        const grid = document.getElementById('available-courses-grid');
        grid.innerHTML = '';
        
        filtered.forEach(course => {
            const isEnrolled = enrolledCourses.includes(course.code);
            
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <div class="course-card-header">
                    <h4 class="course-card-title">${course.name}</h4>
                    <div class="course-card-meta">
                        <span>${course.code}</span>
                        <span>${course.credits} Credits</span>
                    </div>
                </div>
                <div class="course-card-body">
                    <p>${course.description}</p>
                    <div class="course-card-footer">
                        <span>${course.department}</span>
                        <button class="btn btn-primary view-details-btn" data-id="${course.id}">
                            ${isEnrolled ? 'Enrolled' : 'View Details'}
                        </button>
                    </div>
                </div>
            `;
            
            grid.appendChild(card);
        });
        
        // Reattach event listeners
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const courseId = parseInt(this.getAttribute('data-id'));
                showCourseDetails(courseId);
            });
        });
    }
    
    // Initialize the student dashboard
    updateStudentStats();
    renderAvailableCourses();
    renderCurrentCourses();
    renderCompletedCourses();
});