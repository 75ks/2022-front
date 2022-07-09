<template>
  <div>
    <input v-model="customerCreateRef" type="text">
    <button @click="add">登録</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from 'vue'


export default defineComponent({
  name: 'CustomerCreateInput',
  setup(props, context: SetupContext) {
    const customerCreateRef = ref<string>('')

    const add = (e) =>{
      context.emit('add-todo', customerCreateRef.value);
      customerCreateRef.value = ''
    };

    return { add, customerCreateRef};
  }
});
</script>