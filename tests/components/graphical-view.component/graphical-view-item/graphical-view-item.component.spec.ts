import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalViewItemComponent } from '../../../../src/components/graphical-view.component/graphical-view-item/graphical-view-item.component';

import { Step } from '../../../../src/components/graphical-view.component/models/step.model';

describe('GraphicalViewItemComponent', () => {
  let component: GraphicalViewItemComponent;
  let fixture: ComponentFixture<GraphicalViewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicalViewItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicalViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show ITEM', () => {
    let step: Step = { 'image': 'assets/step1_w.png', "imageComplete": 'assets/step1_y.png', "caption": "test caption" };
    component.item = step;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#circle') === null).toBe(false);
  });

  it('should show not ITEM', () => {
    component.item = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#circle') === null).toBe(true);
  });

  it('should show not ITEM caption', () => {
    let step: Step = { 'image': 'assets/step1_w.png', "imageComplete": 'assets/step1_y.png' };
    component.item = step;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#circle') === null).toBe(false);
    expect(fixture.nativeElement.querySelector('.caption-img') === null).toBe(true);
  });

});
