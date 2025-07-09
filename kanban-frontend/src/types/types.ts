// Represents a column in the Kanban board
export interface Column {
  id: number;
  name: string; // e.g., "Done", "Progress", "Pending"
}

// Represents a task assigned to a column
export interface Task {
  id: number;
  title: string;
  description: string;
  column: number; // Foreign key: column ID this task belongs to
}
