import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationErrorHandler } from '@src/app/infra/error/error.handler';
import { MessageType } from '@src/app/shared/enums/message-type.enum';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { SESSION } from '@src/app/utils/consts';

console.error = jest.fn();

describe('ApplicationErrorHandler', () => {
  let errorHandler: ApplicationErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        ApplicationErrorHandler,
        MessagesService
      ]
    });

    errorHandler = TestBed.inject(ApplicationErrorHandler);
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    localStorage.removeItem(SESSION.TOKEN);
  });

  it('should be created', () => {
    expect(errorHandler).toBeTruthy();
  });

  it('should handle unauthorized exception when user is logged', () => {
    localStorage.setItem(SESSION.TOKEN, 'any_token');

    const routerSpy = jest.spyOn(Router.prototype, 'navigate').mockReturnValueOnce(null);
    const messagesSpy = jest.spyOn(MessagesService.prototype, 'notify');

    errorHandler.handleError(fixtureUnauthorizedError());

    expect(routerSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith(['/join/login']);
    expect(messagesSpy).toHaveBeenCalledTimes(1);
    expect(messagesSpy).toHaveBeenCalledWith({
      title: 'Sua sessão expirou',
      text: 'Sua sessão expirou! Por favor faça login novamente.',
      type: MessageType.WARNING
    });
    expect(localStorage.getItem(SESSION.TOKEN)).toBeFalsy();
  });

  it('should handle unauthorized exception when user is logged', () => {
    const routerSpy = jest.spyOn(Router.prototype, 'navigate').mockReturnValueOnce(null);
    const messagesSpy = jest.spyOn(MessagesService.prototype, 'notify');

    errorHandler.handleError(fixtureUnauthorizedError());

    expect(routerSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith(['/join/login']);
    expect(messagesSpy).toHaveBeenCalledTimes(1);
    expect(messagesSpy).toHaveBeenCalledWith({
      title: 'E-mail ou senha inválidos',
      text: 'Por favor verifique o e-mail e senha digitados.',
      type: MessageType.WARNING
    });
  });

  it('should handle backend exception', () => {
    const routerSpy = jest.spyOn(Router.prototype, 'navigate').mockReturnValueOnce(null);
    const messagesSpy = jest.spyOn(MessagesService.prototype, 'notify');

    errorHandler.handleError(fixtureBackendError());

    expect(routerSpy).not.toHaveBeenCalled();
    expect(messagesSpy).toHaveBeenCalledTimes(1);
    expect(messagesSpy).toHaveBeenCalledWith({
      title: 'ANY-500',
      text: 'any_message',
      type: MessageType.DANGER
    });
  });

  it('should handle default exception', () => {
    const routerSpy = jest.spyOn(Router.prototype, 'navigate').mockReturnValueOnce(null);
    const messagesSpy = jest.spyOn(MessagesService.prototype, 'notify');

    errorHandler.handleError(fixtureDefaultError());

    expect(routerSpy).not.toHaveBeenCalled();
    expect(messagesSpy).toHaveBeenCalledTimes(1);
    expect(messagesSpy).toHaveBeenCalledWith({
      title: 'Ops, tivemos um problema',
      text: 'Nos desculpe, algo aconteceu durante o processamento da sua operação.',
      type: MessageType.DANGER
    });
  });
});

function fixtureUnauthorizedError(): any {
  return { status: 401 };
}

function fixtureBackendError(): any {
  return {
    status: 500,
    error: {
      errorCode: 'ANY',
      status: 500,
      message: 'any_message',
      errors: [],
      timestamp: Date.now()
    }
  };
}

function fixtureDefaultError(): any {
  return { status: 500 };
}
