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
      <SuggestInput
        v-model:inputValue="inputValue"
        :options="state.selectOptions"
        :type="type"
        :size="size"
        :requiredFlg="requiredFlg"
        :disableFlg="disableFlg"
        :uniqueId="uniqueId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, reactive, watch} from "vue";
import InputLabel from '../Atoms/label/InputLabel.vue';
import axios from '../../plugins/axios';
import {SelectOption} from '../Atoms/Input/SelectBox.vue';
import SuggestInput from '../Atoms/Input/SuggestInput.vue';

interface Props {
  /** 入力値 */
  inputValue: string | number | null;
  /** 選択リスト */
  options?: SelectOption[];
  /** ターゲットURL */
  targetUrl?: string;
  /** type */
  type?: string;
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
  (e: "update:inputValue", value: string | number | null): string;
}

interface State {
  selectOptions: SelectOption[];
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  targetUrl: "",
  type: "text",
  label: "",
  sideBySideFlg: false,
  inputWidth: "w-3/4",
  size: "md",
  requiredFlg: false,
  disableFlg: false,
});
const emits = defineEmits<Emits>();

const state = reactive<State>({
  selectOptions: [],
});

const inputValue = computed({
  get: () => props.inputValue,
  set: (value) => {
    emits("update:inputValue", value);
  },
});

/** ユニークID */
const uniqueId = computed(() => {
  return Math.random().toString(32).substring(2);
});

onBeforeMount(async () => {
  if (props.targetUrl) {
    // URLが指定されていた場合
    await getSelectOption(props.targetUrl);
  }
});

watch(
  () => props.options,
  () => {
    if (props.options?.length) {
      state.selectOptions = [...props.options];
    }
  },
  { immediate: true }
);

/** 選択肢取得 */
const getSelectOption = (targetUrl: string) => {
  axios.get<SelectOption[]>(targetUrl).then(({ data }) => {
    state.selectOptions.push(...data);
  });
};
</script>

<style></style>
