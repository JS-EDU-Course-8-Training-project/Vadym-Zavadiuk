import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowComponentComponent } from './follow-component.component';

describe('FollowComponentComponent', () => {
  let component: FollowComponentComponent;
  let fixture: ComponentFixture<FollowComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
