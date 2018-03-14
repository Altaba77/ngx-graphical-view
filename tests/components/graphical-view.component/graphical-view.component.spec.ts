import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GraphicalViewComponent } from '../../../src/components/graphical-view.component/graphical-view.component';
import { GraphicalViewItemComponent } from '../../../src/components/graphical-view.component/graphical-view-item/graphical-view-item.component';

import { Step } from '../../../src/components/graphical-view.component/models/step.model';
import { COMPONENT_VARIABLE } from '@angular/platform-browser/src/dom/dom_renderer';
import { SimpleChange } from '@angular/core';

describe('GraphicalViewComponent', () => {
  let component: GraphicalViewComponent;
  let fixture: ComponentFixture<GraphicalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicalViewComponent, GraphicalViewItemComponent],
      imports: [NgbModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('progressValue is >=0 and <=100', () => {
    let value = new SimpleChange(0, -100, false);
    component.ngOnChanges({ "progressValue": value });
    fixture.detectChanges();
    expect(component.progressValue === 0).toBe(true);
  });

  it('should show ITEMS', () => {
    let steps: Step[] = [];
    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step2_w.png', "imageComplete": 'step2_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step3_w.png', "imageComplete": 'step3_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step4_w.png', "imageComplete": 'step4_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step5_w.png', "imageComplete": 'step5_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step6_w.png', "imageComplete": 'step6_y.png', "caption": "test caption" });
    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(false);
    expect(component.progressReady).toBe(true);
    expect(component.progressBarNumber.length === 5).toBe(true);
    expect(fixture.nativeElement.querySelector('#circle') === null).toBe(false);
    expect(fixture.nativeElement.querySelectorAll('#circle').length === 6).toBe(true);
    expect(fixture.nativeElement.querySelector('.caption-img') === null).toBe(false);

  });

  it('should show ITEMS bis', () => {
    let steps: Step[] = [];
    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png' });
    steps.push({ 'image': 'step2_w.png', "imageComplete": 'step2_y.png' });
    steps.push({ 'image': 'step3_w.png', "imageComplete": 'step3_y.png' });
    steps.push({ 'image': 'step4_w.png', "imageComplete": 'step4_y.png' });
    steps.push({ 'image': 'step5_w.png', "imageComplete": 'step5_y.png' });
    steps.push({ 'image': 'step6_w.png', "imageComplete": 'step6_y.png' });
    let valueProgress = new SimpleChange(0, 40, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);
    expect(component.progressReady).toBe(false);
    //give the other mandatory input
    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(false);
    expect(component.progressReady).toBe(true);
    expect(component.progressBarNumber.length === 5).toBe(true);
    expect(fixture.nativeElement.querySelector('#circle') === null).toBe(false);
    expect(fixture.nativeElement.querySelectorAll('#circle').length === 6).toBe(true);
    expect(fixture.nativeElement.querySelector('.caption-img') === null).toBe(true);

  });

  it('should show not ITEMS', () => {

    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);

    let steps: Step[] = [];

    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);

    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png', "caption": "test caption" });
    value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);

  });

  it('test getRGBA function', () => {

    let testedColor: string = "red";
    let expectedColor: number[] = [255, 0, 0, 1];

    let color = component.getRGBA(testedColor);
    expect(color[0] === expectedColor[0] && color[1] === expectedColor[1] && color[2] === expectedColor[2] && color[3] === expectedColor[3]).toBe(true);

    testedColor = "#ff0000";

    color = component.getRGBA(testedColor);
    expect(color[0] === expectedColor[0] && color[1] === expectedColor[1] && color[2] === expectedColor[2] && color[3] === expectedColor[3]).toBe(true);

    testedColor = "rgba(255,0,0,1)";

    color = component.getRGBA(testedColor);
    expect(color[0] === expectedColor[0] && color[1] === expectedColor[1] && color[2] === expectedColor[2] && color[3] === expectedColor[3]).toBe(true);

    testedColor = "blue";

    color = component.getRGBA(testedColor);
    expect(color[0] === expectedColor[0] && color[1] === expectedColor[1] && color[2] === expectedColor[2] && color[3] === expectedColor[3]).toBe(false);

    testedColor = "blueee";

    color = component.getRGBA(testedColor);
    expect(color === null).toBe(true);

    color = component.getRGBA("");
    expect(color === null).toBe(true);

    testedColor = "rgba(0,x,0,1)";

    color = component.getRGBA(testedColor);
    expect(color === null).toBe(true);
  });


  it('should show statusBox', () => {
    let steps: Step[] = [];
    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png' });
    steps.push({ 'image': 'step2_w.png', "imageComplete": 'step2_y.png' });
    steps.push({ 'image': 'step3_w.png', "imageComplete": 'step3_y.png' });
    steps.push({ 'image': 'step4_w.png', "imageComplete": 'step4_y.png' });
    steps.push({ 'image': 'step5_w.png', "imageComplete": 'step5_y.png' });
    steps.push({ 'image': 'step6_w.png', "imageComplete": 'step6_y.png' });
    let valueProgress = new SimpleChange(0, 40, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);
    expect(component.progressReady).toBe(false);
    //give the other mandatory input
    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(false);
    expect(component.progressReady).toBe(true);
    expect(component.statusBox === undefined).toBe(true);

    let test: string = "test";
    let valueStatus = new SimpleChange(undefined, test, false);
    component.ngOnChanges({ "captionStatus": valueStatus });
    fixture.detectChanges();
    expect(component.statusBox === undefined).toBe(false);

  });

  it('should change statusBox color', () => {
    let steps: Step[] = [];
    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png' });
    steps.push({ 'image': 'step2_w.png', "imageComplete": 'step2_y.png' });
    steps.push({ 'image': 'step3_w.png', "imageComplete": 'step3_y.png' });
    steps.push({ 'image': 'step4_w.png', "imageComplete": 'step4_y.png' });
    steps.push({ 'image': 'step5_w.png', "imageComplete": 'step5_y.png' });
    steps.push({ 'image': 'step6_w.png', "imageComplete": 'step6_y.png' });
    let valueProgress = new SimpleChange(0, 40, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);
    expect(component.progressReady).toBe(false);
    //give the other mandatory input
    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(false);
    expect(component.progressReady).toBe(true);
    expect(component.statusBox === undefined).toBe(true);

    let test: string = "test";
    let valueStatus = new SimpleChange(undefined, test, false);
    component.ngOnChanges({ "captionStatus": valueStatus });
    fixture.detectChanges();
    expect(component.statusBox === undefined).toBe(false);
    //default color is empty as text use the color of the body
    expect(component.statusBox.nativeElement.style.color === "").toBe(true);


    let red: string = "red";
    let valueStatusColor = new SimpleChange(undefined, red, false);
    component.ngOnChanges({ "statusColor": valueStatusColor });
    fixture.detectChanges();
    expect(component.getRGBA(component.statusBox.nativeElement.style.color)[0] === component.getRGBA("red")[0]).toBe(true);
    expect(component.getRGBA(component.statusBox.nativeElement.style.color)[1] === component.getRGBA("red")[1]).toBe(true);
    expect(component.getRGBA(component.statusBox.nativeElement.style.color)[2] === component.getRGBA("red")[2]).toBe(true);
    expect(component.getRGBA(component.statusBox.nativeElement.style.color)[3] === component.getRGBA("red")[3]).toBe(true);

  });

  it('should change statusBox border color', () => {
    let steps: Step[] = [];
    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png' });
    steps.push({ 'image': 'step2_w.png', "imageComplete": 'step2_y.png' });
    steps.push({ 'image': 'step3_w.png', "imageComplete": 'step3_y.png' });
    steps.push({ 'image': 'step4_w.png', "imageComplete": 'step4_y.png' });
    steps.push({ 'image': 'step5_w.png', "imageComplete": 'step5_y.png' });
    steps.push({ 'image': 'step6_w.png', "imageComplete": 'step6_y.png' });
    let valueProgress = new SimpleChange(0, 40, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);
    expect(component.progressReady).toBe(false);
    //give the other mandatory input
    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(false);
    expect(component.progressReady).toBe(true);
    expect(component.statusBox === undefined).toBe(true);

    let test: string = "test";
    let valueStatus = new SimpleChange(undefined, test, false);
    component.ngOnChanges({ "captionStatus": valueStatus });
    fixture.detectChanges();
    expect(component.statusBox === undefined).toBe(false);
    //default color is empty
    expect(component.statusBox.nativeElement.style.borderColor === "").toBe(true);


    let red: string = "red";
    let valueStatusColor = new SimpleChange(undefined, red, false);
    component.ngOnChanges({ "statusBorderColor": valueStatusColor });
    fixture.detectChanges();
    expect(component.getRGBA(component.statusBox.nativeElement.style.borderColor)[0] === component.getRGBA("red")[0]).toBe(true);
    expect(component.getRGBA(component.statusBox.nativeElement.style.borderColor)[1] === component.getRGBA("red")[1]).toBe(true);
    expect(component.getRGBA(component.statusBox.nativeElement.style.borderColor)[2] === component.getRGBA("red")[2]).toBe(true);
    expect(component.getRGBA(component.statusBox.nativeElement.style.borderColor)[3] === component.getRGBA("red")[3]).toBe(true);

  });

  it('should change statusBox text size', () => {
    let steps: Step[] = [];
    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png' });
    steps.push({ 'image': 'step2_w.png', "imageComplete": 'step2_y.png' });
    steps.push({ 'image': 'step3_w.png', "imageComplete": 'step3_y.png' });
    steps.push({ 'image': 'step4_w.png', "imageComplete": 'step4_y.png' });
    steps.push({ 'image': 'step5_w.png', "imageComplete": 'step5_y.png' });
    steps.push({ 'image': 'step6_w.png', "imageComplete": 'step6_y.png' });
    let valueProgress = new SimpleChange(0, 40, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);
    expect(component.progressReady).toBe(false);
    //give the other mandatory input
    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(false);
    expect(component.progressReady).toBe(true);
    expect(component.statusBox === undefined).toBe(true);

    let test: string = "test";
    let valueStatus = new SimpleChange(undefined, test, false);
    component.ngOnChanges({ "captionStatus": valueStatus });
    fixture.detectChanges();
    expect(component.statusBox === undefined).toBe(false);
    expect(component.statusBox.nativeElement.style.fontSize === "1rem").toBe(true);


    let size: number = 2;
    let valueStatusColor = new SimpleChange(undefined, size, false);
    component.ngOnChanges({ "statusS": valueStatusColor });
    fixture.detectChanges();
    expect(component.statusBox.nativeElement.style.fontSize === "2rem").toBe(true);

  });

  it('should change statusBox position', () => {
    let steps: Step[] = [];
    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png' });
    steps.push({ 'image': 'step2_w.png', "imageComplete": 'step2_y.png' });
    steps.push({ 'image': 'step3_w.png', "imageComplete": 'step3_y.png' });
    steps.push({ 'image': 'step4_w.png', "imageComplete": 'step4_y.png' });
    steps.push({ 'image': 'step5_w.png', "imageComplete": 'step5_y.png' });
    steps.push({ 'image': 'step6_w.png', "imageComplete": 'step6_y.png' });
    let valueProgress = new SimpleChange(undefined, 0, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);
    expect(component.progressReady).toBe(false);
    //give the other mandatory input
    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(false);
    expect(component.progressReady).toBe(true);
    expect(component.statusBox === undefined).toBe(true);

    let test: string = "test";
    let valueStatus = new SimpleChange(undefined, test, false);
    component.ngOnChanges({ "captionStatus": valueStatus });
    fixture.detectChanges();
    expect(component.statusBox === undefined).toBe(false);
    expect(component.arrowCssValue === "LEFT").toBe(true);


    valueProgress = new SimpleChange(0, 70, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    console.log(component.arrowCssValue )
    expect(component.arrowCssValue === "RIGHT").toBe(true);


    valueProgress = new SimpleChange(70, 50, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    expect(component.arrowCssValue === "MIDDLE").toBe(true);

  });


  it('should change captions text color', () => {
    let steps: Step[] = [];
    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step2_w.png', "imageComplete": 'step2_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step3_w.png', "imageComplete": 'step3_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step4_w.png', "imageComplete": 'step4_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step5_w.png', "imageComplete": 'step5_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step6_w.png', "imageComplete": 'step6_y.png', "caption": "test caption" });
    let valueProgress = new SimpleChange(0, 40, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);
    expect(component.progressReady).toBe(false);
    //give the other mandatory input
    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(false);
    expect(component.progressReady).toBe(true);

    expect(fixture.nativeElement.querySelector('.caption-img') === null).toBe(false);
    //default color for caption is given by the body 
    expect(fixture.nativeElement.querySelector('.caption-img').style.color === '').toBe(true);
  
    let red: string = "red";
    let valueColor = new SimpleChange(undefined, red, false);
    component.ngOnChanges({ "captionColor": valueColor });
    fixture.detectChanges();

    expect(component.getRGBA(fixture.nativeElement.querySelector('.caption-img').style.color)[0] === component.getRGBA("red")[0]).toBe(true);
    expect(component.getRGBA(fixture.nativeElement.querySelector('.caption-img').style.color)[1] === component.getRGBA("red")[1]).toBe(true);
    expect(component.getRGBA(fixture.nativeElement.querySelector('.caption-img').style.color)[2] === component.getRGBA("red")[2]).toBe(true);
    expect(component.getRGBA(fixture.nativeElement.querySelector('.caption-img').style.color)[3] === component.getRGBA("red")[3]).toBe(true);

  });

  it('should change progress bar color', () => {
    let steps: Step[] = [];
    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step2_w.png', "imageComplete": 'step2_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step3_w.png', "imageComplete": 'step3_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step4_w.png', "imageComplete": 'step4_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step5_w.png', "imageComplete": 'step5_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step6_w.png', "imageComplete": 'step6_y.png', "caption": "test caption" });
    let valueProgress = new SimpleChange(0, 40, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);
    expect(component.progressReady).toBe(false);
    //give the other mandatory input
    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(false);
    expect(component.progressReady).toBe(true);

    //default color for progress bar is applie din a class not directly on the element in style
    expect(fixture.nativeElement.querySelector('.progress-bar').style.backgroundColor === "").toBe(true);

    let red: string = "red";
    let valueStatusColor = new SimpleChange(undefined, red, false);
    component.ngOnChanges({ "progressColor": valueStatusColor });
    fixture.detectChanges();

    expect(component.getRGBA(fixture.nativeElement.querySelector('.progress-bar').style.backgroundColor)[0] === component.getRGBA("red")[0]).toBe(true);
    expect(component.getRGBA(fixture.nativeElement.querySelector('.progress-bar').style.backgroundColor)[1] === component.getRGBA("red")[1]).toBe(true);
    expect(component.getRGBA(fixture.nativeElement.querySelector('.progress-bar').style.backgroundColor)[2] === component.getRGBA("red")[2]).toBe(true);
    expect(component.getRGBA(fixture.nativeElement.querySelector('.progress-bar').style.backgroundColor)[3] === component.getRGBA("red")[3]).toBe(true);

  });


  it('should change progress bar background color (part not fill of the progress bar)', () => {
    let steps: Step[] = [];
    steps.push({ 'image': 'step1_w.png', "imageComplete": 'step1_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step2_w.png', "imageComplete": 'step2_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step3_w.png', "imageComplete": 'step3_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step4_w.png', "imageComplete": 'step4_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step5_w.png', "imageComplete": 'step5_y.png', "caption": "test caption" });
    steps.push({ 'image': 'step6_w.png', "imageComplete": 'step6_y.png', "caption": "test caption" });
    let valueProgress = new SimpleChange(0, 40, false);
    component.ngOnChanges({ "progressValue": valueProgress });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(true);
    expect(component.progressReady).toBe(false);
    //give the other mandatory input
    let value = new SimpleChange(undefined, steps, false);
    component.ngOnChanges({ "steps": value });
    fixture.detectChanges();
    expect(component.element === undefined).toBe(false);
    expect(component.progressReady).toBe(true);

    //default color for progress bar is applie din a class not directly on the element in style
    expect(fixture.nativeElement.querySelector('.progress').style.backgroundColor === "").toBe(true);

    let red: string = "red";
    let valueStatusColor = new SimpleChange(undefined, red, false);
    component.ngOnChanges({ "progressBackgroundColor": valueStatusColor });
    fixture.detectChanges();

    expect(component.getRGBA(fixture.nativeElement.querySelector('.progress').style.backgroundColor)[0] === component.getRGBA("red")[0]).toBe(true);
    expect(component.getRGBA(fixture.nativeElement.querySelector('.progress').style.backgroundColor)[1] === component.getRGBA("red")[1]).toBe(true);
    expect(component.getRGBA(fixture.nativeElement.querySelector('.progress').style.backgroundColor)[2] === component.getRGBA("red")[2]).toBe(true);
    expect(component.getRGBA(fixture.nativeElement.querySelector('.progress').style.backgroundColor)[3] === component.getRGBA("red")[3]).toBe(true);

  });

});
