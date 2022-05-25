import { defineStore } from 'pinia';
import { ReserveData } from '../models/types/Reserve';
import axios from '../plugins/axios';

export const useReserveStore = defineStore({
  id: "reserve",
  state: () => ({
    reserves: [] as ReserveData[]
  }),
  getters: {
    getReserves(state): ReserveData[] {
      return state.reserves;
    },
  },
  actions: {
    async fetchReserves(): Promise<void> {
      this.reserves = 
      [
        {
          customerId: 1,
          customerLastName: '顧客',
          customerFirstName: '太郎',
          stuffLastName: 'スタッフ',
          stuffFirstName: '春子',
          rankName: 'ゴールド',
          menu: 'カット/パーマ',
          price: 10000,
          reserveDate: '2022/04/01 15:00'
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
          reserveDate: '2022/04/13 13:00'
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
          reserveDate: '2022/04/28 11:30'
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
          reserveDate: '2022/05/03 18:45'
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
          reserveDate: '2022/04/01 15:00'
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
          reserveDate: '2022/04/13 13:00'
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
          reserveDate: '2022/04/28 11:30'
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
          reserveDate: '2022/05/03 18:45'
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
          reserveDate: '2022/04/01 15:00'
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
          reserveDate: '2022/04/13 13:00'
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
          reserveDate: '2022/04/28 11:30'
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
          reserveDate: '2022/05/03 18:45'
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
          reserveDate: '2022/04/01 15:00'
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
          reserveDate: '2022/04/13 13:00'
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
          reserveDate: '2022/04/28 11:30'
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
          reserveDate: '2022/05/03 18:45'
        },
      ]
    },
    addReserves(array: ReserveData[]): void {
      array.forEach(obj => {
        this.reserves.push(obj);
      });
    },
    resetReserves(): void {
      this.reserves.splice(0);
    }
  },
})