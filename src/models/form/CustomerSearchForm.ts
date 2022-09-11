export class CustomerSearchForm {
  /** 顧客ID */
  customerId: number | null = null;
  /** 店舗ID */
  storeId: number | null = null;
  /** 顧客名 */
  customerName: string = "";
  /** 顧客仮名 */
  customerNameKana: string = "";
  /** 年齢 */
  age: number | null = null;
  /** 性別 */
  gender: number | null = null;
}