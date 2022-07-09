export interface Reserve {
  /** 予約履歴ID */
  reserveHistoryId: string;
  /** ランク */
  rank: string;
  /** メニュー */
  menu: string;
  /** 料金 */
  price: number | null;
  /** 予約日時 */
  reserveDatetime: string;
  /** 予約状態 */
  reserveState: string;
  /** スタッフ(姓) */
  customerLastName: string;
  /** スタッフ(名) */
  customerFirstName: number | null;
  /** スタッフ(セイ) */
  customerLastNameKana: string;
  /** スタッフ(メイ) */
  customerFirstNameKana: string;
  /** 顧客(姓) */
  stuffLastName: string;
  /** 顧客(名) */
  stuffFirstName: string;
  /** 顧客(セイ) */
  stuffLastNameKana: string;
  /** 顧客(メイ) */
  stuffFirstNameKana: string;
}
