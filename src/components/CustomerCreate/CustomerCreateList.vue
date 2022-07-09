<template>
  <div>
    <ul class="customerCreateList">
      <li v-for="customerCreate in state.customerCreateList" :key="customerCreate.customerCreate">{{ customerCreate.customerCreate }}</li>
    </ul>
    <CustomerCreate-input @add-customerCreate="addCustomerCreateAction" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive} from 'vue'
import CustomerCreateInput from '../components/CustomerCreateInput.vue'

export default defineComponent({
  name: 'CustomerCreateList',
  components: {
    CustomerCreateInput  
  },

  setup() {
    const state = reactive<{customerCreateList: Array<{customerCreate: string>;}>({
      customerCreateList: []
    });

    const addCustomerCreateAction = (value: string) => {
      state.customerCreateList.push({customerCreate: value})
    };

    return { state, addCustomerCreateAction };
  }
});

</script>