export class SalesHistory {
  /** 来店履歴ID */
  salesHistoryId: number | null =  null;
  /** 予約履歴ID */
  reserveHistoryId: number | null =  null;
  /** ランク */
  rank: string = "";
  /** メニューID */
  menuId: number | null = null;
  /** メニュー */
  menu: string = "";
  /** 料金 */
  price: number | null = null;
  /** 来店日時 */
  salesDatetime: string = "";
  /** 顧客ID */
  customerId: number | null = null;
  /** スタッフ(姓) */
  customerLastName: string = "";
  /** スタッフ(名) */
  customerFirstName: number | null = null;
  /** スタッフ(セイ) */
  customerLastNameKana: string = "";
  /** スタッフ(メイ) */
  customerFirstNameKana: string = "";
  /** スタッフID */
  stuffId: number | null = null;
  /** 顧客(姓) */
  stuffLastName: string = "";
  /** 顧客(名) */
  stuffFirstName: string = "";
  /** 顧客(セイ) */
  stuffLastNameKana: string = "";
  /** 顧客(メイ) */
  stuffFirstNameKana: string = "";
}
