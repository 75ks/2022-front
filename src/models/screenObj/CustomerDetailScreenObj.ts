export class CustomerDetailScreenObj {
  /** 姓 */
  lastName: string = "";
  /** 名 */
  firstName: string = "";
  /** セイ */
  lastNameKana: string = "";
  /** メイ */
  firstNameKana: string = "";
  /** 生年月日 */
  birthday: string = "";
  /** 年齢 */
  age: number | null = null;
  /** 性別 */
  gender: number | null = null;
  /** 郵便番号 */
  postalCode: number | null = null;
  /** 都道府県 */
  prefectureId: number | null = null;
  /** 市区町村 */
  address1: string = "";
  /** 市区町村以下 */
  address2: string = "";
  /** 建物、部屋番号 */
  address3: string = "";
  /** 電話番号 */
  phoneNumber: string = "";
  /** メールアドレス */
  email: string = "";
}
