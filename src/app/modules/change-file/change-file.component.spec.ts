import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFileComponent } from './change-file.component';

describe('ChangeFileComponent', () => {
  let component: ChangeFileComponent;
  let fixture: ComponentFixture<ChangeFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
