import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';

describe('LoadderComponent', () => {
  let component: LoadderComponent;
  let fixture: ComponentFixture<LoadderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
