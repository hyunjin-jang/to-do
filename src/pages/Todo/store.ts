import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type tTodoListStore = tTodoListState & tTodoListAction;

type tTodoListState = {
  toDoList: Array<tTodo>;
  statusList: Array<ToDoStatus>;
};

type tTodoListAction = {
  changeTodoStatus: (id: number, changeStatus: ToDoStatus) => void;
  deleteStatus: (status: string) => void;
  addNewTodo: (newTodo: string) => void;
  deleteTodo: (id: number) => void;
  addStatus: (newStatus: string) => void;
};

export type tTodo = {
  id: number;
  status: ToDoStatus;
  contents: string;
};

export enum ToDoStatus {
  TO_DO = "TO_DO",
  DOING = "DOING",
  DONE = "DONE",
}

export const useTodoListStore = create<tTodoListStore>()(
  persist(
    (set) => ({
      toDoList: [],
      statusList: [ToDoStatus.TO_DO, ToDoStatus.DOING, ToDoStatus.DONE],
      changeTodoStatus: (id, changeStatus) =>
        set((prev) => {
          const updatedTodoList = prev.toDoList.map((todo) =>
            todo.id === id ? { ...todo, status: changeStatus } : todo
          );
          return {
            toDoList: updatedTodoList,
          };
        }),
      deleteStatus: (status) =>
        set((prev) => {
          const updatedStatusList = prev.statusList.filter((s) => s !== status);
          return {
            statusList: updatedStatusList,
          };
        }),
      addNewTodo: (newTodo) =>
        set((prev) => ({
          toDoList: [
            ...prev.toDoList,
            { id: Date.now(), status: ToDoStatus.TO_DO, contents: newTodo },
          ],
        })),
      deleteTodo: (id) => set((prev) => {
        const updatedTodoList = prev.toDoList.filter((todo) => todo.id !== id);
        return {
          toDoList: updatedTodoList,
        }
      }),
      addStatus: (newStatus) =>
        set((prev) => {
          if (!prev.statusList.includes(newStatus as ToDoStatus)) {
            return {
              statusList: [...prev.statusList, newStatus as ToDoStatus],
            };
          }
          return prev;
        }),
    }),
    {
      name: "todo-storage", // 저장될 `localStorage`의 key 이름
      storage: createJSONStorage(() => localStorage) // storage 사용 - localStorage 지정
    }
  )
);