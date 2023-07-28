"use client";

import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TodoType } from "./DragDrop";
import { FallingLines } from "react-loader-spinner";
import axios from "axios";

type Props = {
  todo: TodoType;
  index: number;
  isDraggingId: string;
  onDeleteTodo: (id: string) => Promise<void>;
};

const Todo = ({ todo, index, isDraggingId, onDeleteTodo }: Props) => {
  const [deleting, setDeleting] = useState<boolean>(false);

  async function handleDelete(id: string) {
    setDeleting(true);
    await onDeleteTodo(id);
    setDeleting(false);
  }

  return (
    <Draggable key={todo.id} draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="py-2 px-5 border border-double  rounded-lg shadow-md flex justify-between items-center"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex gap-2 items-center">
            <FallingLines
              color="#fff"
              width="20"
              visible={isDraggingId === todo.id}
            />
            {todo.title}
          </div>
          <button
            className=""
            onClick={() => handleDelete(todo.id)}
            disabled={deleting}
          >
            {deleting ? "🚫" : "❌"}
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
