import {ConstantBase} from './ConstantBase';

export class RankConstant extends ConstantBase{
}

export const RankId = {
  STYLIST: new RankConstant(1, "スタイリスト"),
  TOPSTYLIST: new RankConstant(2, "トップスタイリスト"),
  DIRECTOR: new RankConstant(3, "ディレクター"),
};

export const RankList = [
  new RankConstant(1, "スタイリスト"),
  new RankConstant(2, "トップスタイリスト"),
  new RankConstant(3, "ディレクター"),
];

const getNameByCode = (code: number | null): string => {
  return <string>codeNameMap.get(code);
}

const codeNameMap = new Map<number | null, string>();
Object.values(RankId).forEach((elem) => {
  codeNameMap.set(elem.code, elem.name);
});


