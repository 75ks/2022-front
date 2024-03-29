export class ReserveSearchForm {
  /** 予約履歴ID */
  reserveHistoryId: string = "";
  /** 顧客名 */
  customerName: string = "";
  /** 担当スタッフ */
  stuffName: string = "";
  /** ランク */
  rankName: string = "";
  /** メニュー */
  menu: string = "";
  /** 料金(下限) */
  priceMin: number | null = null;
  /** 料金(上限) */
  priceMax: number | null = null;
  /** 日時(下限) */
  reserveDateTimeMin: string = "";
  /** 日時(上限) */
  reserveDateTimeMax: string = "";
  /** 予約状態 */
  reserveState: number | null = null;
}
