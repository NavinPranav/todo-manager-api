export class TaskDto {
    id?: number;
    title?: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
    dueDate!: string; 
    assignedTo?: string;
  }