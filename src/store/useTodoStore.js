import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { loadFromDisk, saveToDisk } from "../persistance/storage";

const defaultData = {
   todos: [],
   categories: []
};

export const useTodoStore = create(
   subscribeWithSelector((set, get) => ({
      ...defaultData,
      initalized: false,
      // store init
      init: async () => {
         const data = await loadFromDisk(defaultData);
         set({ ...data, initalized: true });
      },
      // TODO actions
      addTodo: (todo) =>
         set((state) => ({
            todos: [
               ...state.todos,
               {
                  id: crypto.randomUUID(),
                  creationDate: new Date().toISOString(),
                  done: false,
                  ...todo
               }
            ]
         })),
      updateTodo: (id, patch) =>
         set((state) => ({
            todos: state.todos.map((t) =>
               t.id === id ? { ...t, ...patch } : t
            )
         })),
      deleteTodo: (id) =>
         set((state) => ({
            todos: state.todos.filter((t) => t.id !== id)
         })),
      toggleTodo: (id) =>
         set((state) => ({
            todos: state.todos.map((t) =>
               t.id === id ? { ...t, done: !t.done } : t)
         })),
      // Categories action
      addCategory: (title) =>
         set((state) => ({
            categories: [
               ...state.categories,
               {
                  id: crypto.randomUUID(),
                  title
               }
            ]
         })),
      deleteCategory: (id) =>
         set((state) => ({
            categories: state.categories.filter((c) => c.id !== id),
            todos: state.todos.map((t) =>
               t.categoryId === id ? { ...t, categoryId: undefined } : t)
         })),
      getTodosByCategory: (categoryId) =>
         get().todos.filter((t) => t.categoryId === categoryId)
   }))
);

//autosave ? à revoir

let timeout;

useTodoStore.subscribe(
   (s) => ({
      todos: s.todos,
      categories: s.categories
   }),
   (data) => {
      clearTimeout(timeout);

      //trigger la save 400ms après la dernière modification du state. Nouvelle modif entre temps reset le timer
      timeout = setTimeout(() => {
         saveToDisk(data);
      }, 400)
   }
)