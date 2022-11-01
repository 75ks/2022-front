import { MenuManagementDetailForm } from "./MenuManagementDetailForm";

export class MenuManagementUpdateForm {
  /** メニューID */
  menuId: number | null = null;

  /** 詳細 */
  detail: MenuManagementDetailForm[] = [];

}
