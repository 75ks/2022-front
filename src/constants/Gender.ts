import {ConstantBase} from './ConstantBase';

export class GenderConstant extends ConstantBase{
}

export const Gender = {
  MALE: new GenderConstant(1, "男性"),
  FEMALE: new GenderConstant(2, "女性"),
};

export const GenderList = [
  new GenderConstant(1, "男性"),
  new GenderConstant(2, "女性"),
];

const getNameByCode = (code: number | null): string => {
  return <string>codeNameMap.get(code);
}

const codeNameMap = new Map<number | null, string>();
Object.values(Gender).forEach((elem) => {
  codeNameMap.set(elem.code, elem.name);
});


