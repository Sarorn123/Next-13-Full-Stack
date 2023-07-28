"use client";

import React from "react";
import { TodoType } from "./DragDrop";
import { Droppable } from "react-beautiful-dnd";
import Todo from "./Todo";

type Props = {
  id: string;
  label: string;
  todos: TodoType[];
  isDraggingId: string;
  onDeleteTodo: (id: string) => Promise<void>;
};

function Container({
  label,
  todos,
  id,
  isDraggingId,
  onDeleteTodo,
}: Props) {
  return (
    <Droppable droppableId={id}>
      {(provided, { isDraggingOver }) => (
        <div
          className={`w-full rounded-lg px-2 py-2 border transition-all
            ${label === "Start" && `bg-red-500`}
            ${label === "Processing" && `bg-yellow-500`}
            ${label === "Done" && `bg-green-500`}
            ${isDraggingOver && '!bg-slate-800'}
          `}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h1 className="text-center pb-2 text-white text-sm">{label}</h1>
          <div className="grid gap-2">
            {todos.map((todo, index) => (
              <Todo
                todo={todo}
                key={index}
                index={index}
                isDraggingId={isDraggingId}
                onDeleteTodo={onDeleteTodo}
              />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ) 
}

export default Container;
