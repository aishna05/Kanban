import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Column as ColumnType } from '../types/types';
import Task from './Task';

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <Droppable droppableId={column.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            padding: '12px',
            width: '300px',
            minHeight: '300px',
            marginRight: '16px',
          }}
        >
          <h3 style={{ marginBottom: '10px' }}>{column.name}</h3>
          {column.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
