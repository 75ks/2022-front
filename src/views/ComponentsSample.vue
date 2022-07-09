<template>
  <main class="container">
    <h3>Atoms</h3>
    <div></div>

    <h3 class="text-xl">Molecules</h3>
    <div class="grid grid-cols-4 gap-4">
      <div>
        <TextInputWithLabel
          v-model:inputValue="state.textInputWithLabelObj.inputValue"
          :label="state.textInputWithLabelObj.label"
          :sideBySideFlg="state.textInputWithLabelObj.sideBySideFlg"
          :size="state.textInputWithLabelObj.size"
          :requiredFlg="state.textInputWithLabelObj.requiredFlg"
          :disableFlg="state.textInputWithLabelObj.disableFlg"
        />
        <TextInputWithLabel
          label="ラベル名"
          v-model:inputValue="state.textInputWithLabelObj.label"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <CheckBoxWithLabel
          label="横並びフラグ"
          v-model:checked="state.textInputWithLabelObj.sideBySideFlg"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <CheckBoxWithLabel
          label="必須フラグ"
          v-model:checked="state.textInputWithLabelObj.requiredFlg"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <CheckBoxWithLabel
          label="無効フラグ"
          v-model:checked="state.textInputWithLabelObj.disableFlg"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <SelectBoxWithLabel
          label="サイズ"
          v-model:inputValue="state.textInputWithLabelObj.size"
          :options="state.sizeOptions"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        {{ state.textInputWithLabelObj }}
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TextInputWithLabel from "../components/Molecules/CustomInputWithLabel.vue";
import { reactive } from "vue";
import CheckBoxWithLabel from "../components/Molecules/CheckBoxWithLabel.vue";
import SelectBoxWithLabel from "../components/Molecules/SelectBoxWithLabel.vue";
import { SelectOption } from "../components/Atoms/Input/SelectBox.vue";

class TestProps {
  inputValue = "";
  label = "サンプル";
  sideBySideFlg = false;
  inputWidth = "";
  size = "md";
  requiredFlg = true;
  disableFlg = false;
}

const state = reactive({
  textInputWithLabelObj: new TestProps(),
  sizeOptions: [
    { id: "sm", name: "sm" },
    { id: "md", name: "md" },
    { id: "lg", name: "lg" },
  ] as unknown as SelectOption[],
});
</script>

<style></style>
