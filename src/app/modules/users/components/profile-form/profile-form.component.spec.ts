import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileFormComponent } from '@src/app/modules/users/components/profile-form/profile-form.component';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { InputAvatarComponent } from '@src/app/shared/components/input-avatar/input-avatar.component';
import { InputComponent } from '@src/app/shared/components/input/input.component';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        ProfileFormComponent,
        LoadderComponent,
        InputComponent,
        ButtonComponent,
        InputAvatarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
