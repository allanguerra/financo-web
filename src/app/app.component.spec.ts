import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '@src/app/app.component';
import { SnackbarComponent } from '@src/app/shared/components/snackbar/snackbar.component';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        MessagesService
      ],
      declarations: [
        AppComponent,
        SnackbarComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
