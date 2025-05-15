// Admin Dashboard Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mock data for courses
    let courses = [
        { id: 1, name: 'Introduction to Computer Science', code: 'CS101', department: 'Computer Science', credits: 3, capacity: 30, enrolled: 25, description: 'Fundamentals of computer science and programming.' },
        { id: 2, name: 'Data Structures', code: 'CS201', department: 'Computer Science', credits: 4, capacity: 25, enrolled: 22, description: 'Study of fundamental data structures and algorithms.' },
        { id: 3, name: 'Circuit Theory', code: 'EE101', department: 'Electrical Engineering', credits: 3, capacity: 35, enrolled: 30, description: 'Basic principles of electrical circuits.' },
        { id: 4, name: 'Thermodynamics', code: 'ME201', department: 'Mechanical Engineering', credits: 4, capacity: 30, enrolled: 28, description: 'Study of energy and heat transfer.' },
        { id: 5, name: 'Calculus I', code: 'MATH101', department: 'Mathematics', credits: 4, capacity: 40, enrolled: 35, description: 'Introduction to differential and integral calculus.' }
    ];
    
    // Mock data for students
    let students = [
        { id: 1, name: 'John Doe', email: 'john.doe@university.edu', department: 'Computer Science', enrolledDate: '2023-09-01', courses: ['CS101', 'CS201'] },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@university.edu', department: 'Electrical Engineering', enrolledDate: '2023-09-01', courses: ['EE101', 'MATH101'] },
        { id: 3, name: 'Alex Johnson', email: 'alex.johnson@university.edu', department: 'Mechanical Engineering', enrolledDate: '2023-09-01', courses: ['ME201', 'MATH101'] },
        { id: 4, name: 'Sarah Williams', email: 'sarah.williams@university.edu', department: 'Computer Science', enrolledDate: '2023-09-01', courses: ['CS101', 'CS201'] },
        { id: 5, name: 'Michael Brown', email: 'michael.brown@university.edu', department: 'Business Administration', enrolledDate: '2023-09-01', courses: ['MATH101'] }
    ];
    
    // Update dashboard stats
    function updateDashboardStats() {
        document.getElementById('total-courses').textContent = courses.length;
        document.getElementById('total-students').textContent = students.length;
        
        // Calculate total enrollments
        const totalEnrollments = students.reduce((total, student) => total + student.courses.length, 0);
        document.getElementById('total-enrollments').textContent = totalEnrollments;
        
        // Update recent activity
        const activityList = document.getElementById('activity-list');
        activityList.innerHTML = '';
        
        const recentActivities = [
            { action: 'Added new course', details: 'CS301 - Algorithms', time: '2 hours ago' },
            { action: 'Updated course', details: 'CS201 - Data Structures', time: '5 hours ago' },
            { action: 'Student enrolled', details: 'John Doe in ME201', time: '1 day ago' },
            { action: 'System update', details: 'Performed maintenance', time: '2 days ago' }
        ];
        
        recentActivities.forEach(activity => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="activity-action">${activity.action}</span>
                <span class="activity-details">${activity.details}</span>
                <span class="activity-time">${activity.time}</span>
            `;
            activityList.appendChild(li);
        });
    }
    
    // Render courses table
    function renderCoursesTable() {
        const tbody = document.querySelector('#courses-table tbody');
        tbody.innerHTML = '';
        
        courses.forEach(course => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${course.code}</td>
                <td>${course.name}</td>
                <td>${course.department}</td>
                <td>${course.credits}</td>
                <td>${course.capacity}</td>
                <td>${course.enrolled}</td>
                <td>
                    <button class="action-btn edit" data-id="${course.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" data-id="${course.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.action-btn.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const courseId = parseInt(this.getAttribute('data-id'));
                editCourse(courseId);
            });
        });
        
        document.querySelectorAll('.action-btn.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const courseId = parseInt(this.getAttribute('data-id'));
                deleteCourse(courseId);
            });
        });
    }
    
    // Render students table
    function renderStudentsTable() {
        const tbody = document.querySelector('#students-table tbody');
        tbody.innerHTML = '';
        
        students.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.department}</td>
                <td>${student.courses.length}</td>
                <td>
                    <button class="action-btn view" data-id="${student.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        // Add event listeners to view buttons
        document.querySelectorAll('.action-btn.view').forEach(btn => {
            btn.addEventListener('click', function() {
                const studentId = parseInt(this.getAttribute('data-id'));
                viewStudentDetails(studentId);
            });
        });
    }
    
    // Add new course
    document.getElementById('add-course-btn').addEventListener('click', function() {
        const modal = document.getElementById('course-modal');
        const form = document.getElementById('course-form');
        
        // Reset form
        form.reset();
        document.getElementById('modal-title').textContent = 'Add New Course';
        document.getElementById('course-id').value = '';
        
        // Show modal
        modal.classList.add('active');
    });
    
    // Edit course
    function editCourse(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (!course) return;
        
        const modal = document.getElementById('course-modal');
        const form = document.getElementById('course-form');
        
        // Fill form with course data
        document.getElementById('modal-title').textContent = 'Edit Course';
        document.getElementById('course-id').value = course.id;
        document.getElementById('course-name').value = course.name;
        document.getElementById('course-code').value = course.code;
        document.getElementById('department').value = course.department;
        document.getElementById('credits').value = course.credits;
        document.getElementById('capacity').value = course.capacity;
        document.getElementById('description').value = course.description || '';
        
        // Show modal
        modal.classList.add('active');
    }
    
    // Delete course
    function deleteCourse(courseId) {
        if (confirm('Are you sure you want to delete this course?')) {
            courses = courses.filter(c => c.id !== courseId);
            renderCoursesTable();
            updateDashboardStats();
            showToast('Course deleted successfully', 'success');
        }
    }
    
    // View student details
    function viewStudentDetails(studentId) {
        const student = students.find(s => s.id === studentId);
        if (!student) return;
        
        const modal = document.getElementById('student-modal');
        
        // Fill student info
        document.getElementById('student-detail-name').textContent = student.name;
        document.getElementById('student-detail-email').textContent = student.email;
        document.getElementById('student-detail-dept').textContent = student.department;
        document.getElementById('student-detail-date').textContent = student.enrolledDate;
        
        // Fill enrolled courses
        const coursesList = document.getElementById('student-courses-list');
        coursesList.innerHTML = '';
        
        student.courses.forEach(courseCode => {
            const course = courses.find(c => c.code === courseCode);
            if (course) {
                const li = document.createElement('li');
                li.textContent = `${course.code} - ${course.name}`;
                coursesList.appendChild(li);
            }
        });
        
        // Show modal
        modal.classList.add('active');
    }
    
    // Save course (add or update)
    document.getElementById('course-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const courseId = document.getElementById('course-id').value;
        const isEdit = !!courseId;
        
        const courseData = {
            name: document.getElementById('course-name').value,
            code: document.getElementById('course-code').value,
            department: document.getElementById('department').value,
            credits: parseInt(document.getElementById('credits').value),
            capacity: parseInt(document.getElementById('capacity').value),
            description: document.getElementById('description').value,
            enrolled: 0 // New courses start with 0 enrollments
        };
        
        if (isEdit) {
            // Update existing course
            const index = courses.findIndex(c => c.id === parseInt(courseId));
            if (index !== -1) {
                courses[index] = { ...courses[index], ...courseData };
                showToast('Course updated successfully', 'success');
            }
        } else {
            // Add new course
            const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
            courses.push({ id: newId, ...courseData });
            showToast('Course added successfully', 'success');
        }
        
        // Close modal and refresh tables
        document.getElementById('course-modal').classList.remove('active');
        renderCoursesTable();
        updateDashboardStats();
    });
    
    // Search students
    document.getElementById('student-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm === '') {
            renderStudentsTable();
            return;
        }
        
        const filteredStudents = students.filter(student => 
            student.name.toLowerCase().includes(searchTerm) || 
            student.email.toLowerCase().includes(searchTerm) ||
            student.department.toLowerCase().includes(searchTerm)
        );
        
        const tbody = document.querySelector('#students-table tbody');
        tbody.innerHTML = '';
        
        filteredStudents.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.department}</td>
                <td>${student.courses.length}</td>
                <td>
                    <button class="action-btn view" data-id="${student.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        // Reattach event listeners
        document.querySelectorAll('.action-btn.view').forEach(btn => {
            btn.addEventListener('click', function() {
                const studentId = parseInt(this.getAttribute('data-id'));
                viewStudentDetails(studentId);
            });
        });
    });
    
    // Initialize the dashboard
    updateDashboardStats();
    renderCoursesTable();
    renderStudentsTable();
});