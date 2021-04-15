import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';

import { Message } from '@src/app/shared/models/message.model';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { MessageType } from '@src/app/shared/enums/message-type.enum';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  public message: Message = new Message();

  public icon: string = 'fas fa-info-circle';
  public show: string = 'hide';

  constructor(private readonly messagesService: MessagesService) { }

  ngOnInit(): void {
    this.listenNotifications();
  }

  public close(): void {
    this.show = 'hode';
  }

  // PRIVATE METHODS

  private listenNotifications(): void {
    this.messagesService.notifier
      .pipe(
        map((message: Message) => {
          this.message = message;
          this.setIcon();
          this.show = 'show';
        }),
        switchMap(() => timer(5000))
      )
      .subscribe({
        next: (_) => this.show = 'hide'
      });
  }

  private setIcon(): void {
    switch (this.message.type) {
      case MessageType.INFO:
        this.icon = 'fas fa-info-circle';
        break;
      case MessageType.DANGER:
        this.icon = 'fas fa-exclamation-triangle';
        break;
      case MessageType.WARNING:
        this.icon = 'fas fa-exclamation-circle';
        break;
      case MessageType.SUCCESS: {
        this.icon = 'fas fa-check-circle';
        break;
      }
    }
  }
}
