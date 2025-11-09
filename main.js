// AgileFlow - Main JavaScript File
// Professional Agile Management System

// Global state management
let projects = [];
let sprints = [];
let userStories = [];
let currentProject = null;

// Sample data initialization
const sampleProjects = [
    {
        id: 'proj-001',
        name: 'E-commerce Platform',
        description: 'Complete redesign of online shopping experience with modern UX and enhanced security',
        status: 'active',
        teamSize: '8-12',
        deadline: '2024-12-15',
        progress: 75,
        image: 'resources/project-ecommerce.jpg',
        sprints: 3,
        stories: 24,
        created: '2024-09-01'
    },
    {
        id: 'proj-002',
        name: 'Mobile Banking App',
        description: 'Next-generation mobile banking application with biometric authentication',
        status: 'active',
        teamSize: '4-7',
        deadline: '2024-11-30',
        progress: 60,
        image: 'resources/project-banking.jpg',
        sprints: 2,
        stories: 18,
        created: '2024-09-15'
    },
    {
        id: 'proj-003',
        name: 'Healthcare Portal',
        description: 'Patient management system with telemedicine and electronic health records',
        status: 'planning',
        teamSize: '12+',
        deadline: '2025-02-28',
        progress: 25,
        image: 'resources/project-healthcare.jpg',
        sprints: 1,
        stories: 8,
        created: '2024-10-01'
    },
    {
        id: 'proj-004',
        name: 'Educational Platform',
        description: 'Learning management system with AI-powered personalized learning paths',
        status: 'active',
        teamSize: '8-12',
        deadline: '2024-12-31',
        progress: 45,
        image: 'resources/project-education.jpg',
        sprints: 2,
        stories: 31,
        created: '2024-08-20'
    },
    {
        id: 'proj-005',
        name: 'Analytics Dashboard',
        description: 'Business intelligence platform with real-time data visualization',
        status: 'active',
        teamSize: '4-7',
        deadline: '2024-11-15',
        progress: 85,
        image: 'resources/project-analytics.jpg',
        sprints: 3,
        stories: 22,
        created: '2024-07-10'
    },
    {
        id: 'proj-006',
        name: 'Social Media Manager',
        description: 'Comprehensive social media management and analytics platform',
        status: 'completed',
        teamSize: '1-3',
        deadline: '2024-10-31',
        progress: 100,
        image: 'resources/project-social.jpg',
        sprints: 4,
        stories: 35,
        created: '2024-06-01'
    }
];

const sampleSprints = [
    {
        id: 'spr-001',
        projectId: 'proj-001',
        name: 'Sprint 1: Foundation & Auth',
        duration: '2 weeks',
        status: 'completed',
        startDate: '2024-10-01',
        endDate: '2024-10-14',
        goals: ['User authentication system', 'Database schema design', 'API foundation'],
        velocity: 24,
        completedStories: 18
    },
    {
        id: 'spr-002',
        projectId: 'proj-001',
        name: 'Sprint 2: Core Features',
        duration: '3 weeks',
        status: 'active',
        startDate: '2024-10-15',
        endDate: '2024-11-04',
        goals: ['Product catalog', 'Shopping cart', 'Payment integration'],
        velocity: 31,
        completedStories: 6
    },
    {
        id: 'spr-003',
        projectId: 'proj-002',
        name: 'Sprint 1: Security & Auth',
        duration: '2 weeks',
        status: 'active',
        startDate: '2024-10-20',
        endDate: '2024-11-02',
        goals: ['Biometric authentication', 'Secure API endpoints', 'Data encryption'],
        velocity: 18,
        completedStories: 11
    }
];

const sampleUserStories = [
    {
        id: 'story-001',
        projectId: 'proj-001',
        sprintId: 'spr-002',
        title: 'Implement secure user registration',
        description: 'As a new user, I want to register with email verification',
        priority: 'high',
        status: 'doing',
        storyPoints: 8,
        assignee: 'Sarah Chen',
        acceptanceCriteria: ['Email validation', 'Password strength check', 'Verification email sent'],
        tasks: ['Frontend form validation', 'Backend API endpoint', 'Email service integration'],
        bugs: []
    },
    {
        id: 'story-002',
        projectId: 'proj-001',
        sprintId: 'spr-002',
        title: 'Create product search functionality',
        description: 'As a customer, I want to search and filter products',
        priority: 'high',
        status: 'pending',
        storyPoints: 13,
        assignee: 'Mike Rodriguez',
        acceptanceCriteria: ['Text search', 'Category filtering', 'Price range filtering'],
        tasks: ['Search algorithm', 'UI components', 'Database indexing'],
        bugs: []
    },
    {
        id: 'story-003',
        projectId: 'proj-002',
        sprintId: 'spr-003',
        title: 'Biometric login integration',
        description: 'As a user, I want to login with fingerprint or face recognition',
        priority: 'high',
        status: 'pending',
        storyPoints: 13,
        assignee: 'Alex Kim',
        acceptanceCriteria: ['Fingerprint support', 'Face ID support', 'Fallback to PIN'],
        tasks: ['iOS integration', 'Android integration', 'Security testing'],
        bugs: []
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load sample data
    projects = [...sampleProjects];
    sprints = [...sampleSprints];
    userStories = [...sampleUserStories];
    
    // Initialize UI components
    initializeAnimations();
    renderProjects();
    initializeCharts();
    setupEventListeners();
    
    console.log('AgileFlow initialized successfully');
}

function initializeAnimations() {
    // Initialize Splitting.js for text animations
    if (typeof Splitting !== 'undefined') {
        Splitting();
        
        // Animate hero text
        anime({
            targets: '.splitting-text .char',
            translateY: [100, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1400,
            delay: (el, i) => 30 * i
        });
    }
    
    // Initialize Typed.js for dynamic text
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Manage projects with intuitive Kanban boards',
                'Track sprints and team velocity in real-time',
                'Create user stories with bug and task management',
                'Collaborate seamlessly with your entire team'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
    
    // Animate stats cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 800,
                    delay: 200
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    document.querySelectorAll('.card-hover').forEach(card => {
        observer.observe(card);
    });
}

function renderProjects(filteredProjects = null) {
    const projectsToRender = filteredProjects || projects;
    const grid = document.getElementById('projectsGrid');
    
    if (!grid) return;
    
    grid.innerHTML = projectsToRender.map(project => `
        <div class="project-card rounded-xl shadow-lg overflow-hidden card-hover cursor-pointer" 
             onclick="openProject('${project.id}')">
            <div class="relative h-48 overflow-hidden">
                <img src="${project.image}" alt="${project.name}" 
                     class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
                <div class="absolute top-4 right-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}">
                        ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                </div>
                <div class="absolute bottom-4 left-4 right-4">
                    <div class="glass-effect rounded-lg p-3">
                        <div class="flex justify-between items-center text-white text-sm">
                            <span>${project.sprints} Sprints</span>
                            <span>${project.stories} Stories</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${project.name}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${project.description}</p>
                
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">Progress</span>
                        <span class="text-sm font-semibold text-gray-900">${project.progress}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-teal-600 h-2 rounded-full transition-all duration-1000" 
                             style="width: ${project.progress}%"></div>
                    </div>
                    
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-500">Team: ${project.teamSize}</span>
                        <span class="text-gray-500">Due: ${formatDate(project.deadline)}</span>
                    </div>
                </div>
                
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex space-x-2">
                        <button onclick="event.stopPropagation(); editProject('${project.id}')" 
                                class="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                            Edit
                        </button>
                        <button onclick="event.stopPropagation(); viewSprints('${project.id}')" 
                                class="flex-1 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors">
                            Sprints
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Animate project cards
    anime({
        targets: '.project-card',
        translateY: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 600,
        delay: (el, i) => 100 * i
    });
}

function getStatusColor(status) {
    const colors = {
        'active': 'bg-green-100 text-green-800',
        'planning': 'bg-blue-100 text-blue-800',
        'completed': 'bg-gray-100 text-gray-800',
        'paused': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

function initializeCharts() {
    // Sprint Velocity Chart
    const velocityChart = echarts.init(document.getElementById('velocityChart'));
    const velocityOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5'],
            axisLine: {
                lineStyle: {
                    color: '#374151'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#374151'
                }
            }
        },
        series: [{
            name: 'Story Points',
            type: 'bar',
            data: [24, 31, 28, 35, 29],
            itemStyle: {
                color: '#319795'
            },
            barWidth: '60%'
        }]
    };
    velocityChart.setOption(velocityOption);
    
    // Project Progress Chart
    const progressChart = echarts.init(document.getElementById('progressChart'));
    const progressOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: 'Project Status',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 4, name: 'Active', itemStyle: { color: '#319795' } },
                { value: 1, name: 'Planning', itemStyle: { color: '#3b82f6' } },
                { value: 1, name: 'Completed', itemStyle: { color: '#6b7280' } }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    progressChart.setOption(progressOption);
    
    // Make charts responsive
    window.addEventListener('resize', function() {
        velocityChart.resize();
        progressChart.resize();
    });
}

function setupEventListeners() {
    // Project search and filter
    const searchInput = document.getElementById('projectSearch');
    const filterSelect = document.getElementById('projectFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterProjects);
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', filterProjects);
    }
    
    // Project form submission
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectSubmit);
    }
}

function filterProjects() {
    const searchTerm = document.getElementById('projectSearch').value.toLowerCase();
    const statusFilter = document.getElementById('projectFilter').value;
    
    let filtered = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm) || 
                             project.description.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    renderProjects(filtered);
}

// Modal functions
function openProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animate modal appearance
        anime({
            targets: modal.querySelector('.bg-white'),
            scale: [0.8, 1],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 300
        });
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        anime({
            targets: modal.querySelector('.bg-white'),
            scale: [1, 0.8],
            opacity: [1, 0],
            easing: 'easeInExpo',
            duration: 200,
            complete: function() {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
                document.getElementById('projectForm').reset();
            }
        });
    }
}

function handleProjectSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newProject = {
        id: 'proj-' + Date.now(),
        name: document.getElementById('projectName').value,
        description: document.getElementById('projectDescription').value,
        teamSize: document.getElementById('teamSize').value,
        deadline: document.getElementById('projectDeadline').value,
        status: 'planning',
        progress: 0,
        image: 'resources/project-analytics.jpg', // Default image
        sprints: 0,
        stories: 0,
        created: new Date().toISOString().split('T')[0]
    };
    
    projects.unshift(newProject);
    renderProjects();
    closeProjectModal();
    
    // Show success message
    showNotification('Project created successfully!', 'success');
}

// Navigation functions
function openProject(projectId) {
    currentProject = projectId;
    // In a real app, this would navigate to project detail page
    showNotification(`Opening project details for ${projectId}`, 'info');
}

function editProject(projectId) {
    showNotification(`Edit functionality for ${projectId} - Coming soon!`, 'info');
}

function viewSprints(projectId) {
    window.location.href = `sprints.html?project=${projectId}`;
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 300
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            easing: 'easeInExpo',
            duration: 300,
            complete: () => notification.remove()
        });
    }, 3000);
}

// Export functions for use in other pages
window.AgileFlow = {
    projects,
    sprints,
    userStories,
    showNotification,
    formatDate,
    getStatusColor
};