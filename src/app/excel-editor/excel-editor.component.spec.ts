import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelEditorComponent } from './excel-editor.component';

describe('ExcelEditorComponent', () => {
  let component: ExcelEditorComponent;
  let fixture: ComponentFixture<ExcelEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
