import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillElementComponent } from './skill-element.component';

describe('SkillElementComponent', () => {
  let component: SkillElementComponent;
  let fixture: ComponentFixture<SkillElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
