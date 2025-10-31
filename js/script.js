// ===== GLOBAL FUNCTIONS =====

// Save new schedule to backend
async function saveSchedule(data) {
  try {
    const response = await fetch('http://localhost:5000/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      alert('✅ Schedule saved successfully!');
    } else {
      alert('❌ Failed to save schedule');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Error connecting to backend');
  }
}


// Load schedules from backend
async function loadSchedules() {
  try {
    const response = await fetch('http://localhost:5000/api/schedules');
    const data = await response.json();
    console.log('📅 Loaded schedules:', data);
    // agar tum chaaho to yahan DOM me table ya list fill kar sakte ho
  } catch (err) {
    console.error('❌ Error loading schedules:', err);
  }
}

// Toggle Sidebar for mobile view
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Logout and redirect to login page
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// ===== PAGE-SPECIFIC SCRIPTS (RUNS AFTER DOM LOADS) =====
document.addEventListener('DOMContentLoaded', function() {

    // --- DASHBOARD PAGE SCRIPT ---
    if (document.getElementById('utilizationChart')) {
        const ctx = document.getElementById('utilizationChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    label: 'Classroom Utilization (%)',
                    data: [75, 82, 78, 85, 80, 70],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // --- ANALYTICS PAGE SCRIPTS ---
    if (document.getElementById('utilizationTrendChart')) {
        const ctx1 = document.getElementById('utilizationTrendChart').getContext('2d');
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Overall Utilization',
                        data: [65, 72, 78, 75],
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 2
                    },
                    {
                        label: 'Lab Utilization',
                        data: [80, 85, 88, 82],
                        borderColor: '#48bb78',
                        backgroundColor: 'rgba(72, 187, 120, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    if (document.getElementById('departmentChart')) {
        const ctx2 = document.getElementById('departmentChart').getContext('2d');
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['CSE', 'ECE', 'ME', 'CE', 'EE'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        '#667eea',
                        '#48bb78',
                        '#ed8936',
                        '#4299e1',
                        '#ed64a6'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }

    if (document.getElementById('facultyWorkloadChart')) {
        const ctx3 = document.getElementById('facultyWorkloadChart').getContext('2d');
        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Dr. Kumar', 'Prof. Sharma', 'Dr. Patel', 'Prof. Singh', 'Dr. Verma'],
                datasets: [{
                    label: 'Hours/Week',
                    data: [20, 18, 15, 12, 19],
                    backgroundColor: '#ed8936',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 25
                    }
                }
            }
        });
    }

    if (document.getElementById('peakHoursChart')) {
        const ctx4 = document.getElementById('peakHoursChart').getContext('2d');
        new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: ['9-10', '10-11', '11-12', '12-1', '1-2', '2-3', '3-4'],
                datasets: [{
                    label: 'Classes Scheduled',
                    data: [35, 40, 38, 15, 32, 30, 25],
                    backgroundColor: '#667eea',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const btnMenu = document.querySelector('.btn-menu');
        
        if (sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(event.target) && !btnMenu.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
});

// ===== FUNCTIONS FOR ONCLICK ATTRIBUTES =====

// -- TIMETABLE VIEW --
function applyFilters() {
    const department = document.getElementById('departmentFilter')?.value;
    const semester = document.getElementById('semesterFilter')?.value;
    const status = document.getElementById('statusFilter')?.value;
    
    console.log('Filters applied:', { department, semester, status });
    alert('Filters applied! In a real application, this would filter the timetable data.');
}

function exportTimetable() {
    alert('Exporting timetable... This would generate a PDF or Excel file.');
}

function editTimetable() {
    if (confirm('Do you want to edit this timetable?')) {
        window.location.href = 'create-schedule.html';
    }
}

// -- CREATE SCHEDULE --
function nextStep() {
    alert('Moving to the next step! In a full implementation, this would show the next form section.');
}

// -- ANALYTICS --
function exportAnalytics() {
    alert('Exporting analytics report... This would generate a comprehensive PDF report.');
}

// -- APPROVALS --
function filterApprovals(status) {
    console.log('Filtering by:', status);
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-pills .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    event.target.classList.add('active');
    
    alert(`Showing ${status} timetables. In a real application, this would filter the approval cards.`);
}

function viewTimetable(id) {
    console.log('Viewing timetable:', id);
    window.location.href = 'timetable-view.html';
}

function approveTimetable(id) {
    const modal = new bootstrap.Modal(document.getElementById('approvalModal'));
    modal.show();
    window.currentApprovalId = id;
}

function rejectTimetable(id) {
    const modal = new bootstrap.Modal(document.getElementById('rejectionModal'));
    modal.show();
    window.currentRejectionId = id;
}

function confirmApproval() {
    console.log('Approving timetable:', window.currentApprovalId);
    alert(`Timetable ${window.currentApprovalId} has been approved successfully!`);
    bootstrap.Modal.getInstance(document.getElementById('approvalModal')).hide();
    
    // In a real application, you would make an API call here
    setTimeout(() => {
        location.reload();
    }, 1000);
}

function confirmRejection() {
    const textarea = document.querySelector('#rejectionModal textarea');
    const reason = textarea?.value;
    
    if (!reason || reason.trim() === '') {
        alert('Please provide a reason for rejection.');
        return;
    }
    
    console.log('Rejecting timetable:', window.currentRejectionId, 'Reason:', reason);
    alert(`Timetable ${window.currentRejectionId} has been rejected.`);
    bootstrap.Modal.getInstance(document.getElementById('rejectionModal')).hide();
    
    // In a real application, you would make an API call here
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// -- UTILITY FUNCTIONS --
function showNotification(message, type = 'info') {
    // Simple notification function (can be enhanced with a toast library)
    alert(message);
}

// Prevent form submission on Enter key in certain inputs
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') {
        const form = e.target.closest('form');
        if (form && !form.querySelector('button[type="submit"]:focus')) {
            e.preventDefault();
        }
    }
});