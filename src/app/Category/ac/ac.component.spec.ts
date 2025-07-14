import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACComponent } from './ac.component';

describe('ACComponent', () => {
  let component: ACComponent;
  let fixture: ComponentFixture<ACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ACComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
