export class ConstantBase {
  private readonly _code: number | null;
  private readonly _name: string;

  public constructor(code: number | null, name: string) {
    this._code = code;
    this._name = name;
  }

  get code() {
    return this._code;
  }

  get name() {
    return this._name;
  }
}
