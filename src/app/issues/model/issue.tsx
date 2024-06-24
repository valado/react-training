import { v4 as uuidv4 } from 'uuid';

export enum IssuePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: IssuePriority;
  openedOn: number;
}

export const issueFactory = () => ({
  id: uuidv4(),
  title: 'new',
  description: '',
  completed: false,
  priority: IssuePriority.LOW,
  openedOn: new Date().getTime(),
});
