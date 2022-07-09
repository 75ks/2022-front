import {ConstantBase} from './ConstantBase';

export class ReserveStatesConstant extends ConstantBase{
}

export const ReserveStates = {
  RESERVED: new ReserveStatesConstant(1, "予約済"),
  VISITED: new ReserveStatesConstant(2, "来店済"),
  CHANGE: new ReserveStatesConstant(3, "予約日時変更"),
  CANCEL: new ReserveStatesConstant(4, "キャンセル"),
};

const getNameByCode = (code: number | null): string => {
  return <string>codeNameMap.get(code);
}

const codeNameMap = new Map<number | null, string>();
Object.values(ReserveStates).forEach((elem) => {
  codeNameMap.set(elem.code, elem.name);
});
