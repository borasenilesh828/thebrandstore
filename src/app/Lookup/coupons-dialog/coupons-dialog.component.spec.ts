import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsDialogComponent } from './coupons-dialog.component';

describe('CouponsDialogComponent', () => {
  let component: CouponsDialogComponent;
  let fixture: ComponentFixture<CouponsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
