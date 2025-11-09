import { Injectable, signal } from '@angular/core';

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  duration: string;
  status: 'active' | 'completed' | 'planning';
  startDate: string;
  endDate: string;
  goals: string[];
  velocity: number;
  completedStories: number;
}

const sampleSprints: Sprint[] = [
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

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  private sprintsSignal = signal<Sprint[]>(sampleSprints);

  get sprints() {
    return this.sprintsSignal.asReadonly();
  }

  addSprint(sprint: Omit<Sprint, 'id' | 'status' | 'completedStories'>) {
    const newSprint: Sprint = {
      ...sprint,
      id: `spr-${Date.now()}`,
      status: 'planning',
      completedStories: 0,
    };
    this.sprintsSignal.update((sprints) => [newSprint, ...sprints]);
  }
}
