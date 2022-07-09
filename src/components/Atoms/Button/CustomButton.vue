<template>
  <button
    class="text-white font-bold py-1 px-3 active:outline-none focus:outline-none rounded"
    :class="buttonColor(buttonColorNumber)"
  >
    {{ buttonName }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  /** ボタンの名前 */
  buttonName: string;
  /** ボタンの色(1:青、2:赤、3:緑)*/
  buttonColorNumber?: number;
}

const props = defineProps<Props>();

/** ボタンの色を設定する */
const buttonColor = (buttonColorNumber: number | undefined): string => {
  switch(buttonColorNumber) {
    case 1:
      return "bg-blue-400 hover:bg-blue-500";
    case 2:
      return "bg-red-400 hover:bg-red-500";
    case 3:
      return "bg-green-400 hover:bg-green-500";
    default:
      return "bg-gray-400 hover:bg-gray-500";
  }
}

</script>

<style>
</style>
