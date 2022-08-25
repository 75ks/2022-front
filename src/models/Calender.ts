import moment from "moment"
import { Reserve } from "./Reserve"

export interface Calender {
  /** 日付 */
  date: number,
  /** 日時 */
  datetime: string,
  /** 予約情報一覧 */
  dayReserves: Reserve[]
}
