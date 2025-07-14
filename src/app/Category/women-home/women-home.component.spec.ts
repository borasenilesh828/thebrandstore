import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenHomeComponent } from './women-home.component';

describe('WomenHomeComponent', () => {
  let component: WomenHomeComponent;
  let fixture: ComponentFixture<WomenHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomenHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomenHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
