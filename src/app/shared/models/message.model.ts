import { MessageType } from '@src/app/shared/enums/message-type.enum';

export class Message {
  title: string = '';
  text: string = '';
  type: MessageType = MessageType.DEFAULT;
}
