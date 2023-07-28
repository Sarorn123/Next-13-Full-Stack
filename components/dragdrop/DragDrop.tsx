"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { OnDragableType, TodoForUpdate } from "../../types/todo";

export type TodoType = {
  id: string;
  title: string;
  sort: number;
};

type ContainerType = {
  id: string;
  color: string;
  label: string;
  userId: string;
  containerId: string;
  todos: TodoType[];
};

export default function DragDrop() {
  const [data, setData] = useState<ContainerType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDraggingId, setIsDraggingId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [adding, setAdding] = useState<boolean>(false);

  async function fetchData() {
    const res = await axios.get("/api/container");
    setData(res.data.containers);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDrop(dropResult: DropResult) {
    const { destination, draggableId, source } = dropResult;

    let updateData: TodoForUpdate[] = [];

    // same dropable but change index
    if (destination?.droppableId === source.droppableId) {
      if (destination.index === source.index) return;
      const dropable = data.find((drop) => drop.id === source.droppableId);
      if (dropable) {
        const items = dropable.todos;
        const currentIndex = items.findIndex((i) => i.id === draggableId);
        const drag = items.find((item) => item.id == draggableId);

        if (drag) {
          // Remove the item from its current position
          items.splice(currentIndex, 1);
          // Insert the item at the new position
          items.splice(destination.index, 0, drag);
          // Update the index values
          items.forEach((item, index) => {
            item.sort = index;
          });

          updateData = items.map((item) => {
            return {
              id: item.id,
              sort: item.sort,
            };
          });
        }
      }
    } else {
      const destinationData = data.find(
        (drop) => drop.id === destination?.droppableId
      );
      const sourceData = data.find((drop) => drop.id === source.droppableId);

      if (destinationData && sourceData && destination) {
        const items = destinationData.todos;
        const sourceItems = sourceData.todos;
        const drag = sourceItems.find((item) => item.id == draggableId);
        if (drag) {
          items.splice(destination.index, 0, drag);
          sourceItems.splice(source.index, 1);
          items.forEach((item, index) => {
            item.sort = index;
          });

          updateData = items.map((item) => {
            return {
              id: item.id,
              sort: item.sort,
            };
          });
        }
      }
    }

    if (destination?.droppableId) {
      setIsDraggingId(draggableId);
      const body: OnDragableType = {
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        todos: updateData,
      };

      await axios.put("/api/container", body);
      toast.success("Move Success 🎉✈");
      setIsDraggingId("");
    }
  }

  async function onAddTodo() {
    if (!title) return;
    setAdding(true);
    await axios.post("/api/container/todo", { title });
    fetchData();
    setTitle("");
    setAdding(false);
    toast.success("Add Success 🎉✈");
  }

  async function onDeleteTodo(id: string) {
    await axios.put("/api/container/todo", { id });
    fetchData();
    toast.success("Delete Success 🎉✈");
  }

   console.log(data)

  return (
    <>
      <Toaster />
      {loading ? (
        <p className="text-center mt-10">Please Wait ...</p>
      ) : (
        data.length !== 0 && (
          <div className="flex justify-center mt-5 gap-2">
            <input
              type="text"
              className="px-5 py-2 border rounded-lg outline-none bg-transparent"
              placeholder="Add Todo ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="px-5 py-2 rounded-lg border hover:shadow-lg transition-all"
              onClick={onAddTodo}
              disabled={adding}
            >
              {adding ? "Wait" : "➕"}
            </button>
          </div>
        )
      )}
      <DragDropContext onDragEnd={handleDrop}>
        <div className="w-[70%] mx-auto flex justify-between gap-10 mt-5">
          {data.map((container, index: number) => (
            <Container
              key={index}
              id={container.id}
              label={container.label}
              todos={container.todos}
              // for drag loading purpose
              isDraggingId={isDraggingId}
              onDeleteTodo={onDeleteTodo}
            />
            // <h1>Hello</h1>
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
