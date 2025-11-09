import { Component, OnInit, computed } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card';
import { Project, ProjectService } from '../project';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from '../project-modal/project-modal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ProjectModalComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  projects = this.projectService.projects$;
  isModalOpen = false;

  constructor(private projectService: ProjectService) { }

  openProjectModal() {
    this.isModalOpen = true;
  }

  closeProjectModal() {
    this.isModalOpen = false;
  }

  handleFormSubmit(projectData: any) {
    const newProject: Project = {
      id: 'proj-' + Date.now(),
      name: projectData.name,
      description: projectData.description,
      teamSize: projectData.teamSize,
      deadline: projectData.deadline,
      status: 'planning',
      progress: 0,
      image: 'resources/project-analytics.jpg', // Default image
      sprints: 0,
      stories: 0,
      created: new Date().toISOString().split('T')[0]
    };

    this.projectService.addProject(newProject);
    this.closeProjectModal();
  }
}
