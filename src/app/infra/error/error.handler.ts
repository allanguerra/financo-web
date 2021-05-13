import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AppError } from '@src/app/infra/models/error.model';
import { HttpStatus } from '@src/app/shared/enums/http-status.enum';
import { MessageType } from '@src/app/shared/enums/message-type.enum';
import { Message } from '@src/app/shared/models/message.model';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { SESSION } from '@src/app/utils/consts';
import { Messages } from '@src/app/utils/messages';

@Injectable({
  providedIn: 'root'
})
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly messagesService: MessagesService
  ) {
    super();
  }

  handleError(responseError: HttpErrorResponse | any): void {
    this.ngZone.run(() => {
      const error: AppError = Object.assign(new AppError(), responseError.error);
      if (responseError.status === HttpStatus.UNAUTHORIZED) {
        this.handleUnauthorized();
      } else if (error.errorCode) {
        this.handleBackendError(error);
      } else {
        this.handleDefaultError(responseError);
      }
    });
  }

  // PRIVATE METHODS

  private handleUnauthorized(): void {
    const token = localStorage.getItem(SESSION.TOKEN);
    if (token) {
      this.messagesService.notify(Messages.SESSION_EXPIRED);
      localStorage.removeItem(SESSION.TOKEN);
    } else {
      this.messagesService.notify(Messages.WRONG_LOGIN);
    }
    this.router.navigate(['/join/login']);
  }

  private handleBackendError(error: AppError): void {
    const message: Message = {
      title: `${error.errorCode}-${error.status}`,
      text: `${error.message}`,
      type: MessageType.DANGER
    };
    this.messagesService.notify(message);
    console.error(error);
  }

  private handleDefaultError(error: any): void {
    this.messagesService.notify(Messages.DEFAULT_ERROR);
    console.error(error);
  }
}
