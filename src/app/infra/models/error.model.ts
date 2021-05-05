export class AppError {
  public status: number;
  public errorCode: string;
  public message: string;
  public timestamp: number;
  public errors: Array<string>;
}
