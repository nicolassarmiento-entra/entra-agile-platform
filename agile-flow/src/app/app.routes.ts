import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { SprintsComponent } from './sprints/sprints';
import { KanbanComponent } from './kanban/kanban';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'sprints', component: SprintsComponent },
    { path: 'kanban', component: KanbanComponent },
];
