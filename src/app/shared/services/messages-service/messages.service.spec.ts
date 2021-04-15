import { TestBed } from '@angular/core/testing';
import { MessageType } from '@src/app/shared/enums/message-type.enum';
import { Message } from '@src/app/shared/models/message.model';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should notify when receive a new message', (done) => {
    const messageToNotify = {
      title: 'any_title',
      text: 'any_text',
      type: MessageType.DEFAULT,
    };

    service.notifier.subscribe({
      next: (message: Message) => {
        expect(message).toBeTruthy();
        expect(message.title).toEqual('any_title');
        expect(message.text).toEqual('any_text');
        expect(message.type).toEqual('');
        done();
      },
      error: () => done.fail()
    });

    service.notify(messageToNotify);
  });
});
