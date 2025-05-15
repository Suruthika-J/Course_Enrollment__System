// Common functions used across all pages

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation tabs functionality
    const navLinks = document.querySelectorAll('[data-section]');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links and sections
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Add active class to clicked link and corresponding section
                this.classList.add('active');
                const sectionId = this.getAttribute('data-section') + '-section';
                document.getElementById(sectionId).classList.add('active');
            });
        });
    }
    
    // Tab functionality for student courses
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and tab contents
                tabBtns.forEach(tabBtn => tabBtn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding tab content
                this.classList.add('active');
                document.getElementById(tabName + '-tab').classList.add('active');
            });
        });
    }
    
    // Modal close functionality
    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Click outside modal to close
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, you would make an API call to logout
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            window.location.href = 'index.html';
        });
    }
    
    // Check authentication status
    checkAuthStatus();
});

// Check if user is authenticated
function checkAuthStatus() {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    const currentPage = window.location.pathname.split('/').pop();
    
    // If user is logged in and tries to access login/register pages, redirect to dashboard
    if (authToken && (currentPage === 'index.html' || currentPage === 'register.html')) {
        const redirectPage = userRole === 'admin' ? 'admin.html' : 'student.html';
        window.location.href = redirectPage;
    }
    
    // If user is not logged in and tries to access protected pages, redirect to login
    if (!authToken && (currentPage === 'admin.html' || currentPage === 'student.html')) {
        window.location.href = 'index.html';
    }
}

// Show toast notification
window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
};

// Add toast styles dynamically
const toastStyles = document.createElement('style');
toastStyles.textContent = `
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 4px;
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
}

.toast.show {
    transform: translateY(0);
    opacity: 1;
}

.toast-success {
    background-color: #2ecc71;
}

.toast-error {
    background-color: #e74c3c;
}

.toast-warning {
    background-color: #f39c12;
}

.toast-info {
    background-color: #3498db;
}
`;
document.head.appendChild(toastStyles);