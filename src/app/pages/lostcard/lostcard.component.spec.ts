import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostcardComponent } from './lostcard.component';

describe('LostcardComponent', () => {
  let component: LostcardComponent;
  let fixture: ComponentFixture<LostcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LostcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
