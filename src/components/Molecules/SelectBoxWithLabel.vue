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
      <SelectBox
        v-model:selectValue="selectValue"
        :options="state.selectOptions"
        :size="size"
        :requiredFlg="requiredFlg"
        :disableFlg="disableFlg"
        :uniqueId="uniqueId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, watch } from "vue";
import InputLabel from "../Atoms/label/InputLabel.vue";
import SelectBox, { SelectOption } from "../Atoms/Input/SelectBox.vue";
import axios from "../../plugins/axios";

interface State {
  selectOptions: SelectOption[];
}

interface Props {
  /** 入力値 */
  selectValue: string | number | null;
  /** 選択リスト */
  options?: SelectOption[];
  /** ターゲットURL */
  targetUrl?: string;
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
  /** 空選択肢有りフラグ */
  emptyOptionFlg?: boolean;
}

interface Emits {
  (e: "update:selectValue", value: string | number | null): string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  targetUrl: "",
  label: "",
  sideBySideFlg: false,
  inputWidth: "w-3/4",
  size: "md",
  requiredFlg: false,
  disableFlg: false,
  emptyOptionFlg: true,
});
const emits = defineEmits<Emits>();

const selectValue = computed({
  get: () => props.selectValue,
  set: (value) => {
    emits("update:selectValue", value);
  },
});

/** ユニークID */
const uniqueId = computed(() => {
  return Math.random().toString(32).substring(2);
});

const state = reactive<State>({
  selectOptions: [],
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
      // 空選択肢有りフラグがONの場合
      if (props.emptyOptionFlg) {
        state.selectOptions = [{ code: null, name: "" }, ...props.options];
      } else {
        state.selectOptions = [...props.options];
      }
    }
  },
  { immediate: true }
);

const getSelectOption = (targetUrl: string) => {
  axios.get<SelectOption[]>(targetUrl).then(({ data }) => {
    // 空選択肢有りフラグがONの場合
    if (props.emptyOptionFlg) {
      state.selectOptions.push({ code: null, name: "" });
    }
    state.selectOptions.push(...data);
  });
};
</script>

<style></style>
