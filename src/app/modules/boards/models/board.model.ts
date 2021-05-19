import { BaseModel } from '@src/app/shared/models/base.model';

export class Board extends BaseModel {
  constructor(
    public title?: string,
    public description?: string,
    public expirationDay?: number,
    public owner?: string,
    public sharedUsers?: Array<string>,
  ) {
    super();
  }

  // STATIC METHODS

  static fromData(data: any): Board {
    return Object.assign(new Board(), data);
  }
}
