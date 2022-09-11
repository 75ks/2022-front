export class Authorization {
  /** ID */
  id: number | null = null;
  /** JWT */
  jwt: string = '';
  /** 認証タイプ */
  authenticationType: number | null = null;
  /** 初回ログインフラグ */
  firstLoginFlg: number | null = null;
}
