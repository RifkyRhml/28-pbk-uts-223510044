<template>
  <q-page padding>
    <q-card class="q-pa-md" flat bordered>
      <q-card-section>
        <div class="text-h6">Add a Todo</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form @submit.prevent="handleSubmit">
          <q-input
            v-model="newTodo"
            label="New Todo"
            outlined
            clearable
            class="q-mb-md"
          />
          <div class="q-gutter-md">
            <q-btn
              type="submit"
              color="primary"
              label="Add"
              class="q-mb-sm q-mr-sm"
            />
            <q-btn
              type="button"
              color="secondary"
              label="Hide Completed"
              @click="toggleHideCompleted"
              class="q-mb-md"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list bordered separator>
          <q-item v-for="todo in filteredTodos" :key="todo.id">
            <q-item-section avatar>
              <q-checkbox v-model="todo.done" @change="updateTodos" />
            </q-item-section>
            <q-item-section>
              <div v-if="editingId !== todo.id">
                <span :class="{ done: todo.done }">{{ todo.text }}</span>
                <q-btn
                  dense
                  color="warning"
                  icon="edit"
                  @click="editTodo(todo)"
                />
              </div>
              <div v-else>
                <q-input
                  v-model="editText"
                  outlined
                  dense
                  class="q-mb-sm"
                  @keyup.enter="updateTodo"
                  @blur="updateTodo"
                />
              </div>
            </q-item-section>
            <q-item-section side>
              <q-btn
                dense
                color="negative"
                icon="delete"
                @click="removeTodo(todo)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTodoStore } from "../stores/todos";
import { storeToRefs } from "pinia";

const todoStore = useTodoStore();
const { todos, hideCompleted, filteredTodos } = storeToRefs(todoStore);
const { addTodo, removeTodo, toggleHideCompleted, saveTodos } = todoStore;

const newTodo = ref("");
const editingId = ref(null);
const editText = ref("");

const handleSubmit = () => {
  if (newTodo.value.trim()) {
    addTodo(newTodo.value.trim());
    newTodo.value = "";
  }
};

const updateTodos = () => {
  todoStore.saveTodos();
};

const editTodo = (todo) => {
  editingId.value = todo.id;
  editText.value = todo.text;
};

const updateTodo = () => {
  if (editText.value.trim() && editingId.value !== null) {
    todoStore.updateTodo(editingId.value, editText.value.trim());
    editingId.value = null;
    editText.value = "";
  }
};

// Watch for changes in todos and update local storage
watch(
  todos,
  (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  },
  { deep: true }
);
</script>

<style scoped>
.done {
  text-decoration: line-through;
  color: #777;
}

.q-page {
  background-color: #679abb;
  color: #1e1e1e;
}

.q-card {
  background-color: #ffb1b1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.q-card-section {
  background-color: #ffcbcb;
  border-radius: 8px;
  margin-bottom: 10px;
}

.q-input {
  background-color: #ffcbcb;
  border-radius: 4px;
}

.q-btn {
  border-radius: 4px;
  margin-right: 5px;
}

.q-list {
  background-color: #ffcbcb;
  border-radius: 4px;
}

.q-item {
  background-color: #ffb1b1;
  border-radius: 4px;
  margin-bottom: 5px;
}

.q-checkbox {
  color: #679abb;
}
</style>
