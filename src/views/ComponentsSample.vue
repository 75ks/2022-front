<template>
  <main class="container">
    <h3>Atoms</h3>
    <div></div>

    <h3 class="text-xl">Molecules</h3>
    <div class="grid grid-cols-4 gap-4">
      <!-- InputWithLabel -->
      <div>
        <InputWithLabel
          v-model:inputValue="state.textInputWithLabelObj.inputValue"
          :label="state.textInputWithLabelObj.label"
          :sideBySideFlg="state.textInputWithLabelObj.sideBySideFlg"
          :size="state.textInputWithLabelObj.size"
          :requiredFlg="state.textInputWithLabelObj.requiredFlg"
          :disableFlg="state.textInputWithLabelObj.disableFlg"
        />
        <InputWithLabel
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
          v-model:select-value="state.textInputWithLabelObj.size"
          :options="state.sizeOptions"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        {{ state.textInputWithLabelObj }}
      </div>

      <!-- DatePickerWithLabel -->
      <div>
        <DatePickerWithLabel
          v-model:inputValue="state.datePickerObj.inputValue"
          :label="state.datePickerObj.label"
          :sideBySideFlg="state.datePickerObj.sideBySideFlg"
          :size="state.datePickerObj.size"
          :requiredFlg="state.datePickerObj.requiredFlg"
          :disableFlg="state.datePickerObj.disableFlg"
        />

        <InputWithLabel
          label="ラベル名"
          v-model:inputValue="state.datePickerObj.label"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <CheckBoxWithLabel
          label="横並びフラグ"
          v-model:checked="state.datePickerObj.sideBySideFlg"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <CheckBoxWithLabel
          label="必須フラグ"
          v-model:checked="state.datePickerObj.requiredFlg"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <CheckBoxWithLabel
          label="無効フラグ"
          v-model:checked="state.datePickerObj.disableFlg"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <SelectBoxWithLabel
          label="サイズ"
          v-model:select-value="state.datePickerObj.size"
          :options="state.sizeOptions"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        {{ state.datePickerObj }}
      </div>

      <!-- DateTimePickerWithLabel -->
      <div>
        <DateTimePickerWithLabel
          v-model:inputValue="state.dateTimePickerObj.inputValue"
          :label="state.dateTimePickerObj.label"
          :sideBySideFlg="state.dateTimePickerObj.sideBySideFlg"
          :size="state.dateTimePickerObj.size"
          :requiredFlg="state.dateTimePickerObj.requiredFlg"
          :disableFlg="state.dateTimePickerObj.disableFlg"
        />

        <InputWithLabel
          label="ラベル名"
          v-model:inputValue="state.dateTimePickerObj.label"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <CheckBoxWithLabel
          label="横並びフラグ"
          v-model:checked="state.dateTimePickerObj.sideBySideFlg"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <CheckBoxWithLabel
          label="必須フラグ"
          v-model:checked="state.dateTimePickerObj.requiredFlg"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <CheckBoxWithLabel
          label="無効フラグ"
          v-model:checked="state.dateTimePickerObj.disableFlg"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        <SelectBoxWithLabel
          label="サイズ"
          v-model:select-value="state.dateTimePickerObj.size"
          :options="state.sizeOptions"
          :sideBySideFlg="true"
          inputWidth="w-2/3"
          size="sm"
        />
        {{ state.dateTimePickerObj }}
      </div>


    </div>



  </main>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import InputWithLabel from "../components/Molecules/InputWithLabel.vue";
import CheckBoxWithLabel from "../components/Molecules/CheckBoxWithLabel.vue";
import SelectBoxWithLabel from "../components/Molecules/SelectBoxWithLabel.vue";
import DatePickerWithLabel from '../components/Molecules/DatePickerWithLabel.vue';
import DateTimePickerWithLabel from '../components/Molecules/DateTimePickerWithLabel.vue';

class TestProps {
  inputValue;
  label;
  sideBySideFlg;
  inputWidth;
  size;
  requiredFlg;
  disableFlg;

  constructor(inputValue: string, label: string, sideBySideFlg: boolean, inputWidth: string, size: string, requiredFlg: boolean, disableFlg: boolean) {
    this.inputValue = inputValue;
    this.label = label;
    this.sideBySideFlg = sideBySideFlg;
    this.inputWidth = inputWidth;
    this.size = size;
    this.requiredFlg = requiredFlg;
    this.disableFlg = disableFlg;
  }
}

const state = reactive({
  textInputWithLabelObj: new TestProps(
    '', 'InputWithLabel', false, '', '', true, false
  ),
  datePickerObj:  new TestProps(
    '', 'DatePickerWithLabel', false, '', '', true, false
  ),
  dateTimePickerObj:  new TestProps(
    '', 'DateTimePickerWithLabel', false, '', '', true, false
  ),
  sizeOptions: [
    { code: "sm", name: "sm" },
    { code: "md", name: "md" },
    { code: "lg", name: "lg" },
  ],
});

</script>

<style></style>
