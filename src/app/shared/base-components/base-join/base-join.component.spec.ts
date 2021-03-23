import { Injector } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseJoinComponent } from '@src/app/shared/base-components/base-join/base-join.component';

class BaseJoinImpl extends BaseJoinComponent {
  protected buildModelForm(): void {}
}

window = global.window;

describe('BaseJoinComponent', () => {
  let component: BaseJoinComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    }).compileComponents();

    const injector: Injector = TestBed.inject(Injector);
    component = new BaseJoinImpl(injector);
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
