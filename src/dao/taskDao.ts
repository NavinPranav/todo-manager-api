import { Request, Response } from "express";
import { query } from "../sqlConnector";
import { BaseSql } from "../sql/BaseSql";
import { Task } from "../entity/task";

class TaskDao  extends BaseSql {
    async getAllTasks() {
        const tasks = await query("SELECT * FROM task");
        return tasks;
    }
    async insertTask(task: Task) {
    const sql = `
      INSERT INTO task (title, description, status, priority, due_date, assigned_to, timing_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      task.title,
      task.description,
      task.status,
      task.priority,
      task.due_date,
      task.assigned_to,
      task.timing_status
    ];
    await this.execute(sql, values);
  }

  async updateTask(task: Task, id: number) {
    const { title, description, status, priority, due_date, assigned_to } = task;
    const updates = [];
    const values = [];
    if (title) {
      updates.push("title = ?");
      values.push(title);
    }

    if (description) {
      updates.push("description = ?");
      values.push(description);
    }
    if(status) {
        updates.push("status = ?");
        values.push(status);
    }
    if(priority) {
        updates.push("priority = ?");
        values.push(priority);
    }
    if(due_date) {
        updates.push("due_date = ?");
        values.push(due_date);
    }
    if(assigned_to) {
        updates.push("title = ?");
        values.push(title);
    }
    values.push(id);
    const result = await this.execute(
      `UPDATE task SET ${updates.join(", ")} WHERE id = ?`,
      values
    );
  }

  async updateTaskStatus(id: number, status: string, timingStatus: string): Promise<any> {
    const sql = `UPDATE task SET status = ?, timing_status = ? WHERE id = ?`;
    const values = [status, timingStatus, id];
    return await this.execute( sql, values);
  }

  async getTaskDueDate(id: number): Promise<any>{
    const task = await query('SELECT due_date FROM task WHERE id = ?', [id]);
    return task;
  }

}

export const taskDao = new TaskDao();
