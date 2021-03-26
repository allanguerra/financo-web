import { BaseModel } from '@src/app/shared/models/base.model';

export class Board extends BaseModel {
  public title: string;
  public description: string;
  public expirationDay: number;
  public owner: string;
  public sharedUsers: Array<string>;
}
