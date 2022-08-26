import { Reserve } from "./Reserve"

export interface Calender {
  /** 日付 */
  date: number,
  /** 予約情報一覧 */
  dayReserves: Reserve[]
}
