import { Component, Input } from '@angular/core';
import { Project } from '../project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrls: ['./project-card.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;

  getStatusColor(status: string) {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'planning': 'bg-blue-100 text-blue-800',
      'completed': 'bg-gray-100 text-gray-800',
      'paused': 'bg-yellow-100 text-yellow-800'
    };
    return (colors as any)[status] || 'bg-gray-100 text-gray-800';
  }

  editProject(projectId: string) {
    console.log('Editing project:', projectId);
  }

  viewSprints(projectId: string) {
    console.log('Viewing sprints for project:', projectId);
  }
}
