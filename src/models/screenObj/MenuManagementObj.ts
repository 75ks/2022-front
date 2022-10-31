import { MenuManagementDetailObj } from "./MenuManagementDetailObj";

export class MenuManagementObj {
  /** メニューID */
  menuId: number | null = null;

  /** 詳細 */
  detail: MenuManagementDetailObj[] = [];
}
