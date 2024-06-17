import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: JSON.parse(localStorage.getItem("todos")) || [],
  }),
  actions: {
    addTodo(text) {
      const id = Date.now();
      this.todos.push({ id, text, done: false });
      this.saveTodos();
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
      this.saveTodos();
    },
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
    updateTodo(id, newText) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.text = newText;
        this.saveTodos();
      }
    },
    saveTodos() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
  getters: {
    filteredTodos(state) {
      return state.hideCompleted
        ? state.todos.filter((todo) => !todo.done)
        : state.todos;
    },
  },
});
