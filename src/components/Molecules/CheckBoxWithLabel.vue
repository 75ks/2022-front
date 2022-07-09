<template>
  <div :class="sideBySideFlg ? 'flex justify-between items-center' : ''">
    <InputLabel
      :label="label"
      :size="size"
      :requiredFlg="requiredFlg"
      :uniqueId="uniqueId"
    />
    <div
      class="mt-1 rounded-md shadow-sm"
      :class="sideBySideFlg ? inputWidth : 'w-full'"
    >
      <CheckBox
        v-model:checked="checked"
        :size="size"
        :requiredFlg="requiredFlg"
        :disableFlg="disableFlg"
        :uniqueId="uniqueId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import InputLabel from '../Atoms/label/InputLabel.vue';
import CheckBox from '../Atoms/Input/CheckBox.vue';

interface Props {
  /** 入力値 */
  checked: boolean;
  /** 任意のラベル名 */
  label?: string;
  /** ラベルと入力欄横並びフラグ */
  sideBySideFlg?: boolean;
  /** 入力欄の幅 */
  inputWidth?: string;
  /** サイズ */
  size?: string;
  /** 必須フラグ */
  requiredFlg?: boolean;
  /** 無効フラグ */
  disableFlg?: boolean;
}

interface Emits {
  (e: "update:checked", value: boolean): string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  sideBySideFlg: false,
  inputWidth: "w-3/4",
  size: "md",
  requiredFlg: false,
  disableFlg: false,
});
const emits = defineEmits<Emits>();

const checked = computed({
  get: () => props.checked,
  set: (value) => {
    emits("update:checked", value);
  },
});

/** ユニークID */
const uniqueId = computed(() => {
  return Math.random().toString(32).substring(2);
});
</script>

<style></style>
