import {ConstantBase} from './ConstantBase';

export class MessageStatusConstant extends ConstantBase{
}

export const MessageStatus = {
  SUCCESS: new MessageStatusConstant(1, "success"),
  WARNING: new MessageStatusConstant(2, "warning"),
  DANGER: new MessageStatusConstant(3, "danger"),
  INFO: new MessageStatusConstant(4, "info"),
};

const getNameByCode = (code: number | null): string => {
  return <string>codeNameMap.get(code);
}

const codeNameMap = new Map<number | null, string>();
Object.values(MessageStatus).forEach((elem) => {
  codeNameMap.set(elem.code, elem.name);
});
