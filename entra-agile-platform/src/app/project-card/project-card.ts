import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../project.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.html',
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
