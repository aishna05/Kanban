export interface Task {
  id: number;
  title: string;
  description: string;
  column: number;
  order: number;
}

export interface Column {
  id: number;
  name: string;
  board: number;
  order: number;
  tasks: Task[];
}

export interface Board {
  id: number;
  name: string;
  columns: Column[];
}
