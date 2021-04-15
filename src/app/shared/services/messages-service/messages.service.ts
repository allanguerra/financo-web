import { EventEmitter, Injectable } from '@angular/core';
import { Message } from '@src/app/shared/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  public notifier: EventEmitter<Message> = new EventEmitter<Message>();

  constructor() { }

  public notify(message: Message): void {
    this.notifier.emit(message);
  }
}
