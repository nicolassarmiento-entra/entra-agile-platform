import { Injectable, signal } from '@angular/core';

export interface UserStory {
  id: string;
  projectId: string;
  sprintId: string | null;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'doing' | 'done';
  storyPoints: number;
  assignee: string | null;
  acceptanceCriteria: string[];
  tasks: string[];
  bugs: any[];
}

const sampleUserStories: UserStory[] = [
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

@Injectable({
  providedIn: 'root',
})
export class UserStoryService {
  private userStoriesSignal = signal<UserStory[]>(sampleUserStories);

  get userStories() {
    return this.userStoriesSignal.asReadonly();
  }

  addUserStory(userStory: Omit<UserStory, 'id' | 'status' | 'bugs' | 'tasks' | 'acceptanceCriteria'>) {
    const newUserStory: UserStory = {
      ...userStory,
      id: `story-${Date.now()}`,
      status: 'pending',
      bugs: [],
      tasks: [],
      acceptanceCriteria: [],
    };
    this.userStoriesSignal.update((userStories) => [newUserStory, ...userStories]);
  }

  updateUserStoryStatus(storyId: string, newStatus: 'pending' | 'doing' | 'done') {
    this.userStoriesSignal.update((userStories) =>
      userStories.map((story) =>
        story.id === storyId ? { ...story, status: newStatus } : story
      )
    );
  }
}
