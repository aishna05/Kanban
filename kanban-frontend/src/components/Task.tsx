import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task as TaskType } from '../types/types';

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            background: '#fff',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '8px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            ...provided.draggableProps.style
          }}
        >
          <strong>{task.title}</strong>
          {task.description && <p style={{ fontSize: '12px' }}>{task.description}</p>}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
