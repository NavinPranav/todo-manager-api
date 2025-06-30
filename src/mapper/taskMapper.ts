// src/mappers/TaskMapper.ts

import { Task } from "../entity/task";


export class TaskMapper {

  static fromRequest(body: any): Task {
    return new Task({
      id: body.id,
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
      due_date: body.dueDate,
      assigned_to: body.assignedTo,
    });
  }

  static toResponse(task: Task): any {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.due_date,
      assignedTo: task.assigned_to,
      createTs: task.create_ts,
      updateTs: task.update_ts
    };
  }

  static fromDb(row: any): Task {
    return new Task({
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      priority: row.priority,
      due_date: row.due_date,
      assigned_to: row.assigned_to,
      create_ts: row.create_ts,
      update_ts: row.update_ts
    });
  }
}