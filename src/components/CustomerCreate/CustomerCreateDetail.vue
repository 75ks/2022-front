<!-- <template>
  <form>
      <div class="grid gap-6 mb-6 grid-cols-2">
          <div>
              <col-6 class="block mb-2">姓<span class="text-red-500">［必須］</span></col-6>
              <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <col-6 class="block mb-2">セイ<span class="text-red-500">［必須］</span></col-6>
              <input type="text" id="last_name_kana" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="first_name" class="block mb-2">名<span class="text-red-500">［必須］</span></label>
              <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="first_name_kana" class="block mb-2">メイ<span class="text-red-500">［必須］</span></label>
              <input type="text" id="first_name_kana" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="gender" class="block mb-2">性別<span class="text-red-500">［必須］</span></label>
              <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  <option value="" selected disabled></option>
                  <option>男性</option>
                  <option>女性</option>
                  <option>その他</option>
              </select>
          </div><br>
          <div>
              <label for="birhday" class="block mb-2">生年月日</label>
              <input type="text" id="birhday" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="age" class="block mb-2">年齢</label>
              <input type="text" id="age" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="postal_code" class="block mb-2">郵便番号</label>
              <input type="text" id="postal_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-4567" required>
          </div>  
          <div>
              <label for="prefecture" class="block mb-2">都道府県</label>
              <input type="tel" id="prefecture" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="address1" class="block mb-2">市区町村</label>
              <input type="tel" id="address1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="address2" class="block mb-2">市区町村以下</label>
              <input type="tel" id="address2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="address3" class="block mb-2">建物、部屋番号</label>
              <input type="tel" id="address3" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
              <label for="phone" class="block mb-2">電話番号</label>
              <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required>
          </div>
          <div>
              <label for="email" class="block mb-2">メールアドレス<span class="text-red-500">［必須］</span></label>
              <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div><br>
          <div>
              <label for="password" class="block mb-2">パスワード<span class="text-red-500">［必須］</span></label>
              <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div> 
          <div>
              <label for="confirm_password" class="block mb-2">パスワード再入力<span class="text-red-500">［必須］</span></label>
              <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
      </div>
      <div class="px-2">
      <button type="submit" class="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 float-left">戻る</button>
      </div>
      <div class="px-2">
      <button type="submit" class="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">登録</button>
      </div>
    </form>
</template>

<script setup lang="ts">
// import Modal from './Modal.vue';
// import { ReserveData } from '../../models/types/Reserve';
// import { datetimeFormat } from '../../utils/Format';
// import { ref } from 'vue';

// const props = defineProps<{
//   reserveList: ReserveData[]
// }>();

// /** モーダルに渡すデータ */
// const modalReserveData = ref<ReserveData>();
// /** モーダル表示フラグ */
// const isVisibleModal = ref<boolean>(false);
// /** レコードクリックイベント(モーダルを表示する) */
// const showModal = (reserveData: ReserveData) => {
//   modalReserveData.value = reserveData;
//   isVisibleModal.value = true;
// }
// /** モーダル表示時、モーダル外クリックイベント(モーダルを非表示する) */
// const closeModal = () => {
//   isVisibleModal.value = false;
// }
</script>

<style>
</style> -->
