import { Router } from 'express';
import { taskController } from '../controller/taskController';

const router = Router();

router.get('/tasks', taskController.getAllTasks);
router.post('/insert', taskController.createTask);
router.put('/update', taskController.updateTask);
router.put('/update-status', taskController.updateStatus);

export default router;