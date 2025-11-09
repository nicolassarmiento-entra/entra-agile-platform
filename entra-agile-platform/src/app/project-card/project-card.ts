import { Component, Input } from '@angular/core';
import { Project } from '../project.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.html',
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
