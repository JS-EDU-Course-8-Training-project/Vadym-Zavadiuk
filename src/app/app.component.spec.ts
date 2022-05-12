import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const fakeUserService = {
    populate: () => {},
  };
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  fit('should create the app', () => {
    expect(component).toBeTruthy();
  });

  fit('hook ngOnInit should call method UserService.populate', () => {
    const spyPopulate = spyOn(fakeUserService, 'populate');
    component.ngOnInit();
    expect(spyPopulate).toHaveBeenCalled();
  });
});
