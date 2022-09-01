export class EditModalScreenObj {
  /** 予約履歴ID */
  reserveHistoryId: number | null = null;
  /** 顧客ID */
  customerId: number | null = null;
  /** スタッフID */
  stuffId: number | null = null;
  /** メニューID */
  menuId: number | null = null;
  /** 予約日時 */
  reserveDateTime: string = "";
  /** 予約状態 */
  reserveState: number | null = null;
}
