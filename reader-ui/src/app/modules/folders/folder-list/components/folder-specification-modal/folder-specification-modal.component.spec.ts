import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderSpecificationModalComponent } from './folder-specification-modal.component';

describe('FolderSpecificationModalComponent', () => {
  let component: FolderSpecificationModalComponent;
  let fixture: ComponentFixture<FolderSpecificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderSpecificationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderSpecificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
