<template>
  <div class="h-10 p-2 bg-white flex items-center justify-between">
    <div class="test-center flex font-bold">{{ headerName }}</div>
    <CustomButton
      v-if="createButtonTo"
      button-name="新規作成"
      @click="$router.push(createButtonTo)"
      :disable-flg="true"
    />
  </div>
</template>

<script setup lang="ts">
import CustomButton from '../../Atoms/Button/CustomButton.vue';

interface Props {
  /** ヘッダー名 */
  headerName: string;
  /** 新規作成ボタン遷移先 */
  createButtonTo?: string;
}

const props = withDefaults(defineProps<Props>(), {
  createButtonTo: ''
});

</script>

<style>
</style>
