import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntryCardComponent } from '@src/app/modules/dashboard/components/entry-card/entry-card.component';
import { LoadderComponent } from '@src/app/shared/components/loadder/loadder.component';

import { RevenuesListComponent } from './revenues-list.component';

describe('RevenuesListComponent', () => {
  let component: RevenuesListComponent;
  let fixture: ComponentFixture<RevenuesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        RevenuesListComponent,
        EntryCardComponent,
        LoadderComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
