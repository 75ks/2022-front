<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <TodoList />
</template>

<script>
import TodoList from './components/Todo/TodoList.vue'

export default {
  name: 'Todo',
  components: {
    TodoList
  }
}
</script>