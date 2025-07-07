import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Board, Column, Task } from '../../types/types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function BoardPage() {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    api.get('boards/1/').then(res => setColumns(res.data.columns));
  }, []);

  const onDragEnd = (result: any) => {
    // Handle reordering logic (optional: PATCH to update order)
  };

  const handleExport = () => {
    window.open('http://localhost:8000/api/boards/1/export-pdf/');
  };

  return (
    <div>
      <h1>Kanban Board</h1>
      <button onClick={handleExport}>Export as PDF</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {columns.map(col => (
            <Droppable droppableId={col.id.toString()} key={col.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ background: '#eee', padding: 10, minWidth: 250 }}
                >
                  <h3>{col.name}</h3>
                  {col.tasks.map((task, idx) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ margin: '8px 0', padding: 8, background: '#fff', ...provided.draggableProps.style }}
                        >
                          <strong>{task.title}</strong>
                          <p>{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
