import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserDashboardComponent } from './list-user-dashboard.component';

describe('ListUserDashboardComponent', () => {
  let component: ListUserDashboardComponent;
  let fixture: ComponentFixture<ListUserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
