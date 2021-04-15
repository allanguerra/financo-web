import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarComponent } from '@src/app/shared/components/snackbar/snackbar.component';
import { MessageType } from '@src/app/shared/enums/message-type.enum';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let messagesService: MessagesService;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarComponent ],
      providers: [ MessagesService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    messagesService = TestBed.inject(MessagesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a message when receive a notification', () => {
    const message = {
      title: 'any_title',
      text: 'any_text',
      type: MessageType.DEFAULT,
    };

    messagesService.notify(message);
    fixture.detectChanges();

    const title = fixture.debugElement.nativeElement.querySelector('.snackbar_content-title');
    const text = fixture.debugElement.nativeElement.querySelector('.snackbar_content-text');

    expect(title.textContent).toEqual('any_title');
    expect(text.textContent).toEqual('any_text');
  });

  it('should set danger class when receive a danger notification', () => {
    const message = {
      title: 'any_title',
      text: 'any_text',
      type: MessageType.DANGER,
    };

    messagesService.notify(message);
    fixture.detectChanges();

    const snackbar = fixture.debugElement.nativeElement.querySelector('.snackbar');
    const icon = fixture.debugElement.nativeElement.querySelector('.snackbar_icon i');

    expect(snackbar.classList).toContain('danger');
    expect(icon.classList).toContain('fa-exclamation-triangle');
  });

  it('should set warning class when receive a warning notification', () => {
    const message = {
      title: 'any_title',
      text: 'any_text',
      type: MessageType.WARNING,
    };

    messagesService.notify(message);
    fixture.detectChanges();

    const snackbar = fixture.debugElement.nativeElement.querySelector('.snackbar');
    const icon = fixture.debugElement.nativeElement.querySelector('.snackbar_icon i');

    expect(snackbar.classList).toContain('warning');
    expect(icon.classList).toContain('fa-exclamation-circle');
  });

  it('should set success class when receive a success notification', () => {
    const message = {
      title: 'any_title',
      text: 'any_text',
      type: MessageType.SUCCESS,
    };

    messagesService.notify(message);
    fixture.detectChanges();

    const snackbar = fixture.debugElement.nativeElement.querySelector('.snackbar');
    const icon = fixture.debugElement.nativeElement.querySelector('.snackbar_icon i');

    expect(snackbar.classList).toContain('success');
    expect(icon.classList).toContain('fa-check-circle');
  });

  it('should set info class when receive a info notification', () => {
    const message = {
      title: 'any_title',
      text: 'any_text',
      type: MessageType.INFO,
    };

    messagesService.notify(message);
    fixture.detectChanges();

    const snackbar = fixture.debugElement.nativeElement.querySelector('.snackbar');
    const icon = fixture.debugElement.nativeElement.querySelector('.snackbar_icon i');

    expect(snackbar.classList).toContain('info');
    expect(icon.classList).toContain('fa-info-circle');
  });

});
