import { Request, Response } from 'express';
import { taskDao } from '../dao/taskDao';
import { taskService } from '../service/task';
import { TaskUiResponse } from '../dto/response/taskUiResponse';

class TaskController {
    getAllTasks = async (req: Request, res: Response) => {
        const tasks = await taskDao.getAllTasks();
        res.status(200).json({ message: "task", tasks });
    }

    createTask = async (req: Request, res: Response) => {
        try {
            if (!req.body.title) {
                res.status(400).json({ error: 'Title is required' });
            }
            await taskService.createTask(req.body);
            res.status(201).json({ message: 'Task created' });
        } catch (err) {
          console.error('Create task error:', err);
          res.status(500).json({ error: 'Failed to create task' });
        }
    }

    updateTask = async (req: Request, res: Response) => {
        try {
            const uiResponse = await taskService.updateTask(req.body, Number(req.query.id));
            if (uiResponse !== null) {
                res.status(200).json({ message: uiResponse });
            } else {
                res.status(200).json({ message: "success" });
            }
        } catch (e) {
            console.error("Unexpected error in updateTask:", e);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    updateStatus = async (req: Request, res: Response) => {
        try {
          const taskId = Number(req.query.id);
          const status = req.body.status;
          if (isNaN(taskId)) {
            res.status(400).json({ message: 'Invalid task ID' });
          }
          const success = await taskService.updateStatus(taskId, status);
          if (!success) {
            res.status(404).json({ message: 'Task not found or update failed' });
          } else {
            res.status(200).json({ message: 'Task marked as completed' });
        }    
        } catch (err) {
            console.error('Error updating task status:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

}
export const taskController = new TaskController();
