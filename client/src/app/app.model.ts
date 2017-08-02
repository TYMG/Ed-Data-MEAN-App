export class State {
  public _id: string;
  public postalCode: string;

  public constructor(
    _id: string,
    postalCode: string
  ) {
    this._id = _id;
    this.postalCode = postalCode;
  }
}
