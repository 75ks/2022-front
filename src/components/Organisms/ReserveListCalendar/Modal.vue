<template>
  <teleport to="body">
    <div
      v-show="isVisibleModal"
      @click="closeModal()"
      class="fixed inset-0 bg-slate-700 opacity-75 flex items-center justify-center z-50"
    >
    </div>
    <div
      v-show="isVisibleModal"
      class="fixed top-1/2 left-1/2 bg-white flex flex-col items-center justify-center w-1/2 h-auto rounded px-5 pb-5 pt-2 z-50"
      id="modal-content"
    >
      <div class="w-full flex items-center justify-end">
        <p
          @click="closeModal()"
          class="cursor-pointer">✖︎</p>
      </div>
      <div class="w-full flex items-center justify-center">
        <div class="w-1/6">
          <SelectBoxWithLabel
            v-model:select-value="state.screenObj.year"
            :options="selectOptionYYYY"
            :empty-option-flg="false"
          />
        </div>
        <span>年</span>
        <div class="w-1/12">
          <SelectBoxWithLabel
            v-model:select-value="state.screenObj.month"
            :options="selectOptionMM"
            :empty-option-flg="false"
          />
        </div>
        <span>月</span>
      </div>
      <div class="mt-4">
        <CustomButton
          button-name="決定"
          :button-color-number="1"
          @click="updateCurrentDate()"
        />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import moment from 'moment';
import CustomButton from '../../Atoms/Button/CustomButton.vue';
import { computed, reactive, toRefs, watch } from 'vue';
import { SelectOption } from '../../../models/SelectOption';
import { CalendarModalScreenObj } from '../../../models/screenObj/CalendarModalScreenObj';
import SelectBoxWithLabel from '../../Molecules/SelectBoxWithLabel.vue';

interface Props {
  /** モーダル表示フラグ */
  isVisibleModal: boolean;
  /** 現在日時 */
  currentDate: moment.Moment;
}

interface Emits {
  (e: 'closeModal'): void;
  (e: 'updateCurrentDate', value: moment.Moment): void
}

interface State {
  screenObj: CalendarModalScreenObj;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const state = reactive<State>({
  screenObj: new CalendarModalScreenObj()
});

const { currentDate } = toRefs(props);

watch(currentDate, (after, before) => {
  state.screenObj.year = after.format('YYYY');
  state.screenObj.month = after.format('M');
},
{
  immediate: true
});

/** プルダウン(年) */
const selectOptionYYYY = computed<SelectOption[]>(() => {
  const selectOption: SelectOption[] = [];
  for (let i = 2000; i < 2100; i++) {
    const obj: SelectOption = {
      code: i.toString(),
      name: i.toString()
    }
    selectOption.push(obj);
  }
  return selectOption;
});

/** プルダウン(月) */
const selectOptionMM = computed<SelectOption[]>(() => {
  const selectOption: SelectOption[] = [];
  for (let i = 1; i < 13; i++) {
    const obj: SelectOption = {
      code: i.toString(),
      name: i.toString()
    }
    selectOption.push(obj);
  }
  return selectOption;
});

/** モーダル決定ボタンクリックイベント(モーダルで設定した値を現在日時に設定し、モーダルを非表示にする) */
const updateCurrentDate = (): void => {
  const updateCurrentDate =  moment({
    year: Number(state.screenObj.year),
    month: Number(state.screenObj.month) - 1,
    day: 1
  });
  emits("updateCurrentDate", updateCurrentDate);
}

/** モーダル表示時、モーダル外クリックイベント、モーダル✖︎ボタンクリックイベント(モーダルを非表示する) */
const closeModal = (): void => {
  state.screenObj.year = currentDate.value.format('YYYY');
  state.screenObj.month = currentDate.value.format('M');
  emits("closeModal");
}
</script>

<style>
  #modal-content {
    transform: translate(-50%, -50%);
  }
</style>
