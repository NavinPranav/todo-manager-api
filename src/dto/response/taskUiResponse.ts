export class TaskUiResponse {
    private errorMsg: string;
    private taskId: number | undefined;
    private constructor(error: string, taskId: number | undefined) {
        this.errorMsg = error,
        this.taskId = taskId
      }
    static error(error: string, taskId: number | undefined): TaskUiResponse {
        return new TaskUiResponse(error, taskId);
    }
}
