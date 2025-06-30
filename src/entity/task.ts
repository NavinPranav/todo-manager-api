// src/entities/Task.ts

export class Task {
    id?: number;
    title: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
    due_date: string; 
    assigned_to?: string;
    create_ts?: string;
    update_ts?: string;
    timing_status?: string;
  
    constructor(data: Partial<Task>) {
      this.id = data.id;
      this.title = data.title!;
      this.description = data.description;
      this.status = data.status ?? 'pending';
      this.priority = data.priority ?? 'medium';
      this.due_date = data.due_date!;
      this.assigned_to = data.assigned_to;
      this.create_ts = data.create_ts;
      this.update_ts = data.update_ts;
    }
  }