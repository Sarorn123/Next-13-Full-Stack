import { Todo } from "@prisma/client";

export type OnDragableType = {
    sourceId: string,
    destinationId: string,
    todos: TodoForUpdate[],
}

export type TodoForUpdate = {
    id: string
    sort: number
}

export type CreateTodo = Omit<Todo, "id" | "createdAt" | "containerId" | "sort">;