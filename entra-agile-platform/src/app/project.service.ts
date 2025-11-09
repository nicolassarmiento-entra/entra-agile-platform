import { Injectable, signal } from '@angular/core';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'planning' | 'completed';
  teamSize: string;
  deadline: string;
  progress: number;
  image: string;
  sprints: number;
  stories: number;
  created: string;
}

const sampleProjects: Project[] = [
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

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectsSignal = signal<Project[]>(sampleProjects);

  get projects() {
    return this.projectsSignal.asReadonly();
  }

  addProject(project: Omit<Project, 'id' | 'created'>) {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      created: new Date().toISOString().split('T')[0],
      status: 'planning',
      progress: 0,
      sprints: 0,
      stories: 0,
    };
    this.projectsSignal.update((projects) => [newProject, ...projects]);
  }
}
