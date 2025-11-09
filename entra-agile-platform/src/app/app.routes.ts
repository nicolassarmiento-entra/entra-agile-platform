import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';
import { DashboardComponent } from './dashboard/dashboard';
import { SprintsComponent } from './sprints/sprints';
import { KanbanComponent } from './kanban/kanban';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent, title: 'Dashboard' },
      { path: 'sprints', component: SprintsComponent, title: 'Sprints' },
      { path: 'kanban', component: KanbanComponent, title: 'Kanban' },
    ],
  },
];
