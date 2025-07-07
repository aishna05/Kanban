import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import api from '../services/api';
import { Column as ColumnType } from '../types/types';
import Column from './Column';

const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    api.get('boards/1/').then((res) => {
      setColumns(res.data.columns);
    });
  }, []);

  const handleExport = () => {
    window.open('http://localhost:8000/api/boards/1/export-pdf/', '_blank');
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColIdx = columns.findIndex(col => col.id.toString() === source.droppableId);
    const destColIdx = columns.findIndex(col => col.id.toString() === destination.droppableId);
    if (sourceColIdx === -1 || destColIdx === -1) return;

    const sourceCol = columns[sourceColIdx];
    const destCol = columns[destColIdx];
    const taskMoved = sourceCol.tasks[source.index];

    if (source.droppableId === destination.droppableId) {
      const updatedTasks = [...sourceCol.tasks];
      updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, taskMoved);
      const updatedCol = { ...sourceCol, tasks: updatedTasks };
      const updatedColumns = [...columns];
      updatedColumns[sourceColIdx] = updatedCol;
      setColumns(updatedColumns);
    } else {
      const sourceTasks = [...sourceCol.tasks];
      const destTasks = [...destCol.tasks];
      sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, { ...taskMoved, column: destCol.id });
      const updatedColumns = [...columns];
      updatedColumns[sourceColIdx] = { ...sourceCol, tasks: sourceTasks };
      updatedColumns[destColIdx] = { ...destCol, tasks: destTasks };
      setColumns(updatedColumns);

      // Optional: sync backend update here
      api.put(`tasks/${taskMoved.id}/`, { ...taskMoved, column: destCol.id });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Kanban Board</h2>
      <button onClick={handleExport} style={{ marginBottom: 16 }}>Export as PDF</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
