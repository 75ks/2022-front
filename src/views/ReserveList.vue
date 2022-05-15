<template>
  <div>
    <Header :header-name="'予約一覧'" />
    <SalesSearch />
    <SalesSearchDetail :sale-list="saleList"/>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/ReserveList/Header.vue';
import SalesSearch from '../components/ReserveList/SalesSearchHeader.vue';
import SalesSearchDetail from '../components/ReserveList/SalesSearchDetail.vue';
import { ref } from 'vue';
import { SaleData } from '../models/types/Sale';

/** 予約情報 */
const saleList = ref<SaleData[]>([
  {
    customerId: 1,
    customerLastName: '顧客',
    customerFirstName: '太郎',
    stuffLastName: 'スタッフ',
    stuffFirstName: '春子',
    rankName: 'ゴールド',
    menu: 'カット/パーマ',
    price: 10000,
    salesDate: '2022/04/01'
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
    salesDate: '2022/04/13'
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
    salesDate: '2022/04/28'
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
    salesDate: '2022/05/03'
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
    salesDate: '2022/04/01'
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
    salesDate: '2022/04/13'
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
    salesDate: '2022/04/28'
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
    salesDate: '2022/05/03'
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
    salesDate: '2022/04/01'
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
    salesDate: '2022/04/13'
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
    salesDate: '2022/04/28'
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
    salesDate: '2022/05/03'
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
    salesDate: '2022/04/01'
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
    salesDate: '2022/04/13'
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
    salesDate: '2022/04/28'
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
    salesDate: '2022/05/03'
  },
]);
</script>

<style>
</style>
