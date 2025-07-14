import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardDialogComponent } from './giftcard-dialog.component';

describe('GiftcardDialogComponent', () => {
  let component: GiftcardDialogComponent;
  let fixture: ComponentFixture<GiftcardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftcardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftcardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
