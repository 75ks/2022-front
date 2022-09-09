export class CustomerSearchForm {
  /** スタッフID */
  customerId: number | null = null;
  /** 店舗ID */
  storeId: number | null = null;
  /** スタッフ名 */
  customerName: string = "";
  /** スタッフ仮名 */
  customerNameKana: string = "";
  /** ランク名 */
  rankName: string = "";
  /** 年齢 */
  age: number | null = null;
  /** 性別 */
  gender: number | null = null;
}