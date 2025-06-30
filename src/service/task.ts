import { taskDao } from "../dao/taskDao";
import { TaskDto } from "../dto/request/taskDto";
import { TaskUiResponse } from "../dto/response/taskUiResponse";
import { Task } from "../entity/task";
import { TimingStatus } from "../enum/timingStatus";
import { TaskMapper } from "../mapper/taskMapper";

class TaskService{
    async createTask(taskDto: TaskDto) {
        const task = TaskMapper.fromRequest(taskDto);
        task.timing_status = new Date() <= new Date(taskDto.dueDate) ? TimingStatus.ON_TIME: TimingStatus.DELAY;
        await taskDao.insertTask(task);
    }
    async updateTask(taskDto: TaskDto, id: number): Promise<TaskUiResponse | null> {
        try {
            if (taskDto.dueDate) {
                const dueDate = new Date(taskDto.dueDate);
                if (isNaN(dueDate.getTime())) {
                    return TaskUiResponse.error("Invalid due date format", taskDto.id);
                }
                if (dueDate < new Date()) {
                    return TaskUiResponse.error("Due date cannot be lesser than today", taskDto.id);
                }
            }
            const task = TaskMapper.fromRequest(taskDto);
            await taskDao.updateTask(task, id);
            return null;
        } catch (e) {
            console.error("Error updating task:", e);
            return TaskUiResponse.error("Unexpected error occurred", taskDto.id);
        }
    }

    async updateStatus(id: number, status: string): Promise<boolean> {
        try {
            const task: any = await taskDao.getTaskDueDate(id);
          
            const now = new Date();
            const dueDate = new Date(task[0].due_date);
            const timingStatus = now <= dueDate ? TimingStatus.ON_TIME: TimingStatus.DELAY;
            const result = await taskDao.updateTaskStatus(id, status, timingStatus);
            return result.affectedRows > 0;
        } catch (err) {
          console.error('markTaskCompleted failed:', err);
          return false;
        }
    }

}
export const taskService = new TaskService();
