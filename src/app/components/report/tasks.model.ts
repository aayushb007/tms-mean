export interface Task {
    id: number;
    taskType: string;
    title: string;
    desc: string;
    status: string;
    startDate: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    FeatureId: number;
    feature_id: number | null;
    subtasks: SubTask[];
    Users: User[];
  }
  
  export interface SubTask {
    id: number;
    taskType: string;
    parentTaskId: number;
    title: string;
    desc: string;
    status: string;
    assignedTo: string;
    startDate: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    TaskId: number;
    task_id: number | null;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    // UserTask: {
    //   createdAt: string;
    //   updatedAt: string;
    //   UserId: number;
    //   TaskId: number;
    // };
  }
  