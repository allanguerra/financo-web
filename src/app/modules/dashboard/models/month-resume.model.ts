export class MonthResume {
  constructor(
    onWallet?: number,
    revenues?: number,
    expenses?: number,
  ) {}

  // STATIC METHODS

  static fromData(data: any): MonthResume {
    return Object.assign(new MonthResume(), data);
  }
}
