const apiBaseUrl = '/api/students';

class AuthUtils {
    static showToast(message, type = 'success') {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      document.body.appendChild(toast);
  
      setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => toast.remove(), 3000);
      }, 10);
    }
  
    static addToastStyles() {
      if (!document.querySelector('style[data-toast-styles]')) {
        const style = document.createElement('style');
        style.dataset.toastStyles = true;
        style.textContent = `
          .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            opacity: 0;
            transform: translateY(100px);
            transition: all 0.3s ease;
          }
          .toast.show { opacity: 1; transform: translateY(0); }
          .toast-success { background-color: #2ecc71; }
          .toast-error { background-color: #e74c3c; }
          .toast-warning { background-color: #f39c12; }
        `;
        document.head.appendChild(style);
      }
    }
  }
  
  class AuthHandlers {
    static async handleAdminLogin(e) {
      e.preventDefault();
      const username = document.getElementById('admin-username').value;
      const password = document.getElementById('admin-password').value;
  
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('authToken', 'mock-admin-token');
        localStorage.setItem('userRole', 'admin');
        window.location.href = 'admin.html';
      } else {
        AuthUtils.showToast('Invalid admin credentials', 'error');
      }
    }
  
    static async handleStudentLogin(e) {
      e.preventDefault();
      const username = document.getElementById('student-username').value;
      const password = document.getElementById('student-password').value;
  
      try {
        const response = await fetch(`${apiBaseUrl}/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
          method: 'POST'
        });
        if (!response.ok) {
          throw new Error('Invalid student credentials');
        }
        const student = await response.json();
        if (student && student.id) {
          localStorage.setItem('authToken', 'mock-student-token');
          localStorage.setItem('userRole', 'student');
          localStorage.setItem('studentName', student.name);
          window.location.href = 'student.html';
        } else {
          AuthUtils.showToast('Invalid student credentials', 'error');
        }
      } catch (error) {
        AuthUtils.showToast(error.message, 'error');
      }
    }
  
    static async handleRegistration(e) {
      e.preventDefault();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
    
      if (password !== confirmPassword) {
        AuthUtils.showToast('Passwords do not match', 'error');
        return;
      }
    
      const newStudent = {
        username: document.getElementById('username').value,
        password: password,
        name: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value,
        studentId: document.getElementById('student-id').value,
        cgpa: 0.0
      };
    
      try {
        const response = await fetch(apiBaseUrl + '/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newStudent)
        });
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        AuthUtils.showToast('Registration successful! Redirecting...', 'success');
        setTimeout(() => window.location.href = 'index.html', 2000);
      } catch (error) {
        AuthUtils.showToast(error.message, 'error');
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    AuthUtils.addToastStyles();
  
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
      adminLoginForm.addEventListener('submit', AuthHandlers.handleAdminLogin);
    }
  
    const studentLoginForm = document.getElementById('student-login-form');
    if (studentLoginForm) {
      studentLoginForm.addEventListener('submit', AuthHandlers.handleStudentLogin);
    }
  
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      const passwordInput = document.getElementById('password');
      if (passwordInput) {
        passwordInput.addEventListener('input', () => 
          AuthUtils.updatePasswordStrengthUI(passwordInput.value)
        );
      }
      registerForm.addEventListener('submit', AuthHandlers.handleRegistration);
    }
  });
