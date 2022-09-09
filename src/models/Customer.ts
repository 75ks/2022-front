export class Customer {
  /** スタッフID */
  customerId: number | null = null;
  /** 店舗ID */
  storeId: number | null = null;
  /** スタッフ(姓) */
  lastName: string = "";
  /** スタッフ(名) */
  firstName: string = "";
  /** スタッフ(セイ) */
  lastNameKana: string = "";
  /** スタッフ(メイ) */
  firstNameKana: string = "";
  /** ランク */
  rank: string = "";
  /** 生年月日 */
  birthday: string = "";
  /** 年齢 */
  age: number | null = null;
  /** 性別 */
  gender: number | null = null;
  /** 郵便番号 */
  postalCode: string = "";
  /** 都道府県 */
  prefectureId: string = "";
  /** 住所1 */
  address1: string = "";
  /** 住所2 */
  address2: string = "";
  /** 住所3 */
  address3: string = "";
  /** 電話番号 */
  phoneNumber: string = "";
  /** メールアドレス */
  email: string = "";
}
