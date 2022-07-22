export class CustomerCreateRequest {
  /** 店舗ID */
  storeId: string = "";
  /** 姓 */
  lastName: string = "";
  /** 名 */
  firstName: string = "";
  /** セイ */
  lastNameKana: string = "";
  /** メイ */
  firstNameKana: string = "";
  /** 生年月日 ※後でDate型に修正※ */
  birhday: string = "";
  /** 年齢 */
  age: string = "";
  /** 性別 */
  gender: string = "";
  /** 郵便番号 */
  postal_code: string = "";
  /** 都道府県 */
  prefecture: string = "";
  /** 市区町村 */
  address1: string = "";
  /** 市区町村以下 */
  address2: string = "";
  /** 建物、部屋番号 */
  address3: string = "";
  /** 電話番号 */
  phone_number: string = "";
  /** メールアドレス */
  email: string = "";
  /** パスワード,パスワード再入力 */
  password: string = "";
}
