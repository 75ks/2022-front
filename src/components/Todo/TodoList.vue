<template>
  <div>
    <ul class="todolist">
      <li v-for="todo in state.todoList" :key="todo.todo">{{ todo.todo }}</li>
    </ul>
    <Todo-input @add-todo="addTodoAction" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive} from 'vue'
import TodoInput from '../components/Todo/TodoInput.vue'

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoInput
  },

  setup() {
    const state = reactive<{todoList: Array<{todo: string>;}>({
      todoList: []
    });

    const addTodoAction = (value: string) => {
      state.todoList.push({todo: value})
    };

    return { state, addTodoAction };
  }
});
</script>