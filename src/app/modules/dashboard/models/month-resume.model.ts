export class MonthResume {
  constructor(
    public onWallet?: number,
    public revenues?: number,
    public expenses?: number,
  ) {}

  // STATIC METHODS

  static fromData(data: any): MonthResume {
    return Object.assign(new MonthResume(), data);
  }
}
