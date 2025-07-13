import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompoenentComponent } from './new-compoenent.component';

describe('NewCompoenentComponent', () => {
  let component: NewCompoenentComponent;
  let fixture: ComponentFixture<NewCompoenentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCompoenentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCompoenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
