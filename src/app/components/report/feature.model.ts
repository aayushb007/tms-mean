export interface User {
    id: number;
    name: string;
    email: string;
    FeatureUser?: {
      createdAt: string;
      updatedAt: string;
      user_id: number;
      feature_id: number;
    };
  }
  
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
  }
  
  export interface Feature {
    id: number;
    title: string;
    description: string;
    status: string;
    startDate: string;
    dueDate: string;
    users: User[];
    tasks?: Task[];
  }