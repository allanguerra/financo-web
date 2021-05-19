import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardsFormComponent } from '@src/app/modules/boards/components/boards-form/boards-form.component';
import { BoardsFormService } from '@src/app/modules/boards/services/boards-form-service/boards-form.service';
import { CategoriesFormService } from '@src/app/modules/categories/services/categories-form-service/categories-form.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { InputComponent } from '@src/app/shared/components/input/input.component';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';
import { MessagesService } from '@src/app/shared/services/messages-service/messages.service';
import { IMaskModule } from 'angular-imask';
import { of } from 'rxjs';

describe('BoardsFormComponent', () => {
  let component: BoardsFormComponent;
  let fixture: ComponentFixture<BoardsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        IMaskModule
      ],
      providers: [
        MessagesService,
        CategoriesFormService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: [ { path: 'new' } ], parent: { url: [ { path: 'boards' } ] } } }
        }
      ],
      declarations: [
        BoardsFormComponent,
        LoadderComponent,
        ButtonComponent,
        InputComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button if form is invalid', () => {
    const serviceSpy = jest.spyOn(BoardsFormService.prototype, 'store').mockReturnValueOnce(of(null));

    const submitButton = fixture.debugElement.nativeElement.querySelectorAll('.button')[1];
    submitButton.click();
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should enable submit button if form is valid and call service to store', () => {
    const serviceSpy = jest.spyOn(BoardsFormService.prototype, 'store').mockReturnValueOnce(of(null));

    component.modelForm.get('title').setValue('any_title');
    component.modelForm.get('expirationDay').setValue('28');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.nativeElement.querySelectorAll('.button')[1];
    submitButton.click();
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith({
      _id: null,
      title: 'any_title',
      description: null,
      expirationDay: 28,
      sharedUsers: [],
      owner: null
    });
  });
});
