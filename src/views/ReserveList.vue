<template>
  <div>
    <Header :header-name="'予約一覧'" />
    <ReserveSearch />
    <ReserveSearchDetail :reserve-list="reserveList"/>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/ReserveList/Header.vue';
import ReserveSearch from '../components/ReserveList/ReserveSearchHeader.vue';
import ReserveSearchDetail from '../components/ReserveList/ReserveSearchDetail.vue';
import { ref } from 'vue';
import { ReserveData } from '../models/types/Reserve';

/** 予約情報 */
const reserveList = ref<ReserveData[]>([
  {
    customerId: 1,
    customerLastName: '顧客',
    customerFirstName: '太郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '春子',
    rankName: 'ゴールド',
    menu: 'カット/パーマ',
    price: 10000,
    reserveDate: '2022/04/01'
  },
  {
    customerId: 2,
    customerLastName: '顧客',
    customerFirstName: '二郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '夏子',
    rankName: 'ブロンズ',
    menu: 'カット',
    price: 5000,
    reserveDate: '2022/04/13'
  },
  {
    customerId: 3,
    customerLastName: '顧客',
    customerFirstName: '三郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '秋子',
    rankName: 'プラチナ',
    menu: 'カット/カラー',
    price: 12000,
    reserveDate: '2022/04/28'
  },
  {
    customerId: 4,
    customerLastName: '顧客',
    customerFirstName: '四郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '冬子',
    rankName: 'シルバー',
    menu: 'カット',
    price: 5000,
    reserveDate: '2022/05/03'
  },
  {
    customerId: 1,
    customerLastName: '顧客',
    customerFirstName: '太郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '春子',
    rankName: 'ゴールド',
    menu: 'カット/パーマ',
    price: 10000,
    reserveDate: '2022/04/01'
  },
  {
    customerId: 2,
    customerLastName: '顧客',
    customerFirstName: '二郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '夏子',
    rankName: 'ブロンズ',
    menu: 'カット',
    price: 5000,
    reserveDate: '2022/04/13'
  },
  {
    customerId: 3,
    customerLastName: '顧客',
    customerFirstName: '三郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '秋子',
    rankName: 'プラチナ',
    menu: 'カット/カラー',
    price: 12000,
    reserveDate: '2022/04/28'
  },
  {
    customerId: 4,
    customerLastName: '顧客',
    customerFirstName: '四郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '冬子',
    rankName: 'シルバー',
    menu: 'カット',
    price: 5000,
    reserveDate: '2022/05/03'
  },
  {
    customerId: 1,
    customerLastName: '顧客',
    customerFirstName: '太郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '春子',
    rankName: 'ゴールド',
    menu: 'カット/パーマ',
    price: 10000,
    reserveDate: '2022/04/01'
  },
  {
    customerId: 2,
    customerLastName: '顧客',
    customerFirstName: '二郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '夏子',
    rankName: 'ブロンズ',
    menu: 'カット',
    price: 5000,
    reserveDate: '2022/04/13'
  },
  {
    customerId: 3,
    customerLastName: '顧客',
    customerFirstName: '三郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '秋子',
    rankName: 'プラチナ',
    menu: 'カット/カラー',
    price: 12000,
    reserveDate: '2022/04/28'
  },
  {
    customerId: 4,
    customerLastName: '顧客',
    customerFirstName: '四郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '冬子',
    rankName: 'シルバー',
    menu: 'カット',
    price: 5000,
    reserveDate: '2022/05/03'
  },
  {
    customerId: 1,
    customerLastName: '顧客',
    customerFirstName: '太郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '春子',
    rankName: 'ゴールド',
    menu: 'カット/パーマ',
    price: 10000,
    reserveDate: '2022/04/01'
  },
  {
    customerId: 2,
    customerLastName: '顧客',
    customerFirstName: '二郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '夏子',
    rankName: 'ブロンズ',
    menu: 'カット',
    price: 5000,
    reserveDate: '2022/04/13'
  },
  {
    customerId: 3,
    customerLastName: '顧客',
    customerFirstName: '三郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '秋子',
    rankName: 'プラチナ',
    menu: 'カット/カラー',
    price: 12000,
    reserveDate: '2022/04/28'
  },
  {
    customerId: 4,
    customerLastName: '顧客',
    customerFirstName: '四郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '冬子',
    rankName: 'シルバー',
    menu: 'カット',
    price: 5000,
    reserveDate: '2022/05/03'
  },
]);
</script>

<style>
</style>
