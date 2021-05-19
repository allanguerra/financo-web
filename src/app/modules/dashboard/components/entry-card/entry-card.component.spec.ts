import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Expense } from '@src/app/modules/expenses/models/expense.model';
import { CategoryType } from '@src/app/shared/enums/category-type.enum';
import { Colors } from '@src/app/shared/enums/colors.enum';

import { EntryCardComponent } from './entry-card.component';

describe('EntryCardComponent', () => {
  let component: EntryCardComponent;
  let fixture: ComponentFixture<EntryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ EntryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu when click on menu icon', () => {
    const menuButton = fixture.debugElement.nativeElement.querySelector('.fas.fa-ellipsis-v');
    menuButton.click();
    fixture.detectChanges();

    expect(component.showMenu).toBe(true);
  });

  it('should emit remove event when click on remove icon', (done) => {
    component.entry = fixtureEntry();
    const removeIcon = fixture.debugElement.nativeElement.querySelector('.fas.fa-trash');

    component.remove.subscribe({
      next: (expense: Expense) => {
        expect(expense._id).toEqual('any_id');
        expect(expense.title).toEqual('any_title');
        expect(expense.description).toEqual('any_description');
        expect(expense.value).toEqual(10);
        expect(expense.recurrent).toEqual(false);
        expect(expense.recurrentTimes).toEqual(null);
        done();
      },
      error: () => done.fail()
    });

    removeIcon.click();
    fixture.detectChanges();
  });
});

function fixtureEntry(): Expense {
  return {
    _id: 'any_id',
    title: 'any_title',
    description: 'any_description',
    value: 10,
    recurrent: false,
    recurrentTimes: null,
    category: {
      _id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      color: Colors.BLACK,
      type: CategoryType.EXPENSE,
      getType: () => 'DESPESAS'
    },
    createdAt: new Date()

  };
}
