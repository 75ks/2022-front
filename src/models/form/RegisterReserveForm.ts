export class RegisterReserveForm {
  /** 顧客ID */
  customerId: number | null = null;
  /** スタッフID */
  stuffId: number | null = null;
  /** メニューID */
  menuId: number | null = null;
  /** 予約日時 */
  reserveDateTime: string = "";
}
