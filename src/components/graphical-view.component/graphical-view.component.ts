import { Component, Input, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef, OnChanges, SimpleChange, HostListener } from '@angular/core';
import { Step } from './models/step.model';
import { CaptionPosition } from './models/caption-position.model';
import { StatusPosition } from './models/status-position.model';
import { Direction } from './models/direction.model';

@Component({
  selector: 'graphical-view',
  template: `<div *ngIf="steps && steps.length > 1 && direction === 'HORIZONTAL'" #graphicalviewcomponent class="container-fluid">

  <!-- Status part -->
  <div *ngIf="captionStatus && captionStatus.length>0  && statusPosition==='TOP'" class="mb-4 status-container" [style.padding-right]="paddingProgress"
    [style.padding-left]="paddingProgress">
    <div #statusParent class="status-bar" [style.padding-left]="statusBoxPadding+'%'">
      <span #status [style.font-size.rem]="statusS" [style.color]="statusColor" [ngClass]="{'arrow-tooltip':true,'arrow-tooltip-right':arrowCssValue==='RIGHT','arrow-tooltip-left':arrowCssValue==='LEFT'
         ,'arrow-tooltip-middle':arrowCssValue==='MIDDLE','arrow-tooltip-bottom':true}" [innerHTML]="captionStatus">

      </span>
    </div>
  </div>

  <!-- img part -->
  <div *ngIf="progressReady" class="flex-container">
    <div *ngFor="let item of steps;index as i" class="graphical-view">
      <graphical-view-item [item]="item" [value]="progressValues[i] ? progressValues[i] : progressValues[i-1]===100 ? 100 : 0"
        [height]="stepsH" [font-size]="fontS" [caption-position]="captionPosition" [caption-color]="captionColor" [direction]="direction">
      </graphical-view-item>
    </div>
  </div>

  <!-- progress bars part -->
  <div *ngIf="progressReady" [style.padding-right]="paddingProgress" [style.padding-left]="paddingProgress" class="flex-container">
    <div *ngFor="let item of progressBarNumber;index as i" class="graphical-view" [style.margin-top]="calcProgressBarPosition()">
      <div *ngIf="i===0">
        <ngb-progressbar [height]="progressBarH+'rem'" [value]="progressValues[i]"></ngb-progressbar>
      </div>
      <div *ngIf="i===progressBarNumber.length-1">
        <ngb-progressbar [height]="progressBarH+'rem'" [value]="progressValues[i]"></ngb-progressbar>
      </div>
      <div *ngIf="i!==progressBarNumber.length-1 && i!==0">
        <ngb-progressbar [height]="progressBarH+'rem'" [value]="progressValues[i]"></ngb-progressbar>
      </div>
    </div>
  </div>


  <!-- Status part -->
  <div *ngIf="captionStatus && captionStatus.length>0 && statusPosition==='BOTTOM'" class="mt-4 status-container" [style.padding-right]="paddingProgress"
    [style.padding-left]="paddingProgress">
    <div id="statusParent" class="status-bar" [style.padding-left]="statusBoxPadding+'%'">
      <span #status [style.font-size.rem]="statusS" [style.color]="statusColor" [ngClass]="{'arrow-tooltip':true,'arrow-tooltip-right':arrowCssValue==='RIGHT','arrow-tooltip-left':arrowCssValue==='LEFT'
       ,'arrow-tooltip-middle':arrowCssValue==='MIDDLE'}" [innerHTML]="captionStatus">
      </span>
    </div>
  </div>
</div>

<!-- ----------------------- VERTICAL PGRAPHICAL ---------------------------------------------- -->
<div *ngIf="steps && steps.length > 1 && direction === 'VERTICAL'" #graphicalviewcomponent class="container-fluid container-vertical">

  <!-- img + progress bar part -->
  <div #progressbarcontainer *ngIf="progressReady" class="flex-container flex-container-vertical">
    <div *ngFor="let item of steps;index as i" class="graphical-view">
      <graphical-view-item [item]="item" [value]="progressValues[i] ? progressValues[i] : progressValues[i-1]===100 ? 100 : 0"
        [height]="stepsH" [font-size]="fontS" [caption-position]="captionPosition" [caption-color]="captionColor" [direction]="direction">
      </graphical-view-item>
      <div *ngIf="i<progressBarNumber.length" class="vertical-progress" [style.width]="widthProgressV" [style.height]="progressBarL+'rem'" [style.padding-top]="paddingTopProgressV">
        <ngb-progressbar [height]="progressBarH+'rem'" [value]="progressValues[i]"></ngb-progressbar>
      </div>
    </div>
  </div>


  <!-- Status part -->
  <div *ngIf="captionStatus && captionStatus.length>0" class="status-container status-container-vertical" [style.bottom]="statusBoxVerticalPos+'px'">
    <div id="statusParent" class="status-bar" [style.padding-left]="statusBoxHorizontalPos+'px'">
      <span #status [style.font-size.rem]="statusS" [style.color]="statusColor" [ngClass]="{'arrow-tooltip':true,'arrow-tooltip-vertical-left':arrowCssValue==='VERTICAL-LEFT','arrow-tooltip-vertical-right':arrowCssValue==='VERTICAL-RIGHT'}" [innerHTML]="captionStatus">
      </span>
    </div>
  </div>
</div>`,
  styles: [`.flex-container{
    display: flex;
    flex-direction: row;
}

.flex-container-vertical{
  flex-direction: column;
  height: 100%;
}

.graphical-view{
    flex: 1;
}

.status-container{
    white-space: nowrap;
}

.arrow-tooltip {
    position: relative;
    padding: 0.5em;
    border: 2px solid #512698;
    background: #fff;
    padding-left: 8px;
    padding-right: 8px;
  }
  
  .arrow-tooltip:after, .arrow-tooltip:before {
    position: absolute;
    bottom: 100%;
    width: 0;
    height: 0;
    content: ' ';
    pointer-events: none;
    border: solid transparent;
  }
  
  .arrow-tooltip-left:after, .arrow-tooltip-left:before {
    left: 15%;
  }
  
  .arrow-tooltip-middle:after, .arrow-tooltip-middle:before {
    left: 50%;
  }
  
  .arrow-tooltip-right:after, .arrow-tooltip-right:before {
    left: 85%;
  }
  
  .arrow-tooltip:after {
    margin-left: -10px;
    border-width: 10px;
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #fff;
  }
  
  .arrow-tooltip:before {
    margin-left: -13px;
    border-width: 13px;
    border-color: rgba(81, 38, 152, 0);
    border-bottom-color: #512698;
  }

  .arrow-tooltip-bottom:after, .arrow-tooltip-bottom:before {
    bottom: calc(-2rem + 6px);
    transform: rotateZ(180deg);
  }

  .arrow-tooltip-bottom:after {
    margin-left: -16px;
    border-width: 16px;
  }

  .arrow-tooltip-vertical-left:after, .arrow-tooltip-vertical-left:before {
    bottom: calc(50% - 13px);
    left: calc(100% + 1rem - 1px);
    transform: rotateZ(90deg);
  }

  .arrow-tooltip-vertical-left:after {
    margin-left: -15px;
    border-width: 13px;
  }

  .arrow-tooltip-vertical-right:after, .arrow-tooltip-vertical-right:before {
    bottom: calc(50% - 13px);
    left: -13px;
    transform: rotateZ(-90deg);
  }

  .arrow-tooltip-vertical-right:after {
    margin-left: -11px;
    border-width: 13px;
  }
  
  .arrow-tooltip {
    font-size: 1rem;
    overflow: hidden;
  }

  .vertical-progress{
    transform: rotateZ(90deg);
    margin: auto;
  }

  .status-container-vertical{
    position: absolute;
    width: 100%;

  }

  .container-vertical{
    position: relative;
  }


`]
})
export class GraphicalViewComponent implements AfterViewChecked, OnChanges {


  //number of progress bar (number of image -1)
  progressBarNumber: any[] = [];
  //padding to apply on left and rigth of the progress bars container 
  paddingProgress: string = "0";

  @Input("steps") steps: Step[] = [];

  progressValues: number[] = [];

  @Input("progress-value") progressValue: number = 0;

  progressReady: boolean = false;

  //default value for image height (rem)
  @Input("steps-height") stepsH: number = 10;

  //default value for progress bar height (rem)
  @Input("progress-bar-height") progressBarH: number = 1;

  //default value for progress bar length (rem)
  @Input("progress-bar-length") progressBarL: number = 5;

  //default value for caption size (rem)
  @Input("caption-size") fontS: number = 1;

  //default position BOTTOM (under the image)
  @Input("caption-position") captionPosition: CaptionPosition = CaptionPosition.BOTTOM;

  // private _captionColor: string = "black";
  @Input("caption-color") captionColor: string = "";

  //default value is the default color of ng-bootstrap progressbar
  @Input("progress-color") progressColor: string = "";

  //default value is the default background color of ng-bootstrap progressbar
  @Input("progress-background-color") progressBackgroundColor: string = "";

  //default no caption 
  @Input("status-caption") captionStatus: string = "";

  //default value bottom under the graphical view
  @Input("status-position") statusPosition: string = StatusPosition.BOTTOM;

  //default color body color
  @Input("status-color") statusColor: string = "";


  //default color body color
  @Input("status-border-color") statusBorderColor: string = "";


  //default value for status text size (rem)
  @Input("status-size") statusS: number = 1;


  //default value HORIZONTAL for progress bar direction
  @Input("direction") direction: Direction = Direction.HORIZONTAL;


  //value used to set the status box at the good place
  arrowCssValue: string = "";
  statusBoxPadding: string = "0";
  statusBoxVerticalPos: number = 50;
  statusBoxHorizontalPos: number = 50;

  //value used to set the vertical position of the progress bar
  widthProgressV: string = "";
  paddingTopProgressV: string = "";

  @ViewChild("graphicalviewcomponent") element: ElementRef;
  @ViewChild("status") statusBox: ElementRef;
  @ViewChild("progressbarcontainer") progressbarcontainer: ElementRef;

  @HostListener("window:resize")
  onResize(event: any) {
    this.setStatusBox()
  }

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked() {
    this.calculateprogressVerticalPosition();
    this.verifyStatusPositionInput(this.statusPosition);
    this.setStatusBox();
    this.verifyProgressBarColor();
    this.setStatusBoxBorder();
    //timeout is need to have the container div at its final height in case of vertical graphical view
    setTimeout(() => { this.setStatusBox(); }, 100);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    for (let propName in changes) {
      let changedProp = changes[propName];
      // let from = JSON.stringify(changedProp.previousValue);
      // let to = JSON.stringify(changedProp.currentValue);
      // console.log(`${propName} changed from ${from} to ${to}`);

      if (changedProp.previousValue !== changedProp.currentValue) {
        if (propName === "steps") {
          this.progressBarNumber = [];
          this.steps = changedProp.currentValue;
          this.steps.forEach((step) => { this.progressBarNumber.push(step) });
          this.progressBarNumber.pop();
          this.paddingProgress = (100 / this.steps.length / 2).toString() + "%";
        } else if (propName === "progressValue") {
          if (changedProp.currentValue && changedProp.currentValue >= 0 && changedProp.currentValue <= 100) {
            this.progressValue = changedProp.currentValue;
          } else {
            this.progressValue = 0;
          }
        } else {
          let color = this.getRGBA(changedProp.currentValue);
          if (color) {
            (<any>this)[propName] = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
          } else {
            (<any>this)[propName] = changedProp.currentValue;
          }
        }
      }
    }
    this.progressValues = this.setProgressValues(this.progressValue);
    this.progressReady = this.verifyProgressStatut();

  }

  /**
   * Calculate the number of progress bars to fill according the overall pourcentage 
   * @param overallValue the overall percentage of the progress bar 
   */
  setProgressValues(overallValue: number): number[] {
    this.progressValues = [];
    if (this.progressBarNumber.length > 0) {
      const numberOfProgressBar = (overallValue * this.progressBarNumber.length / 100).toFixed(2);
      const numberOfFullyFillProgressBar = Number.parseInt(numberOfProgressBar.toString().split(".")[0]);
      const valueOfLastFillProgressBar = Number.parseInt(numberOfProgressBar.toString().split(".")[1]);
      let progressValues: number[] = [];
      this.progressBarNumber.forEach((step, index) => {
        if (index + 1 <= numberOfFullyFillProgressBar) {
          progressValues.push(100);
        } else if (index === numberOfFullyFillProgressBar) {
          progressValues.push(valueOfLastFillProgressBar);
        } else {
          progressValues.push(0);
        }
      });
      return progressValues;
    } else {
      console.error("No images have been provided, cannot bind the pourcentage");
      return [];
    }
  }

  /**
   * Verify that the progress values are ready and that the number of progress bars = the number of values
   */
  verifyProgressStatut(): boolean {
    if (this.progressValues && this.progressBarNumber && this.progressValues.length === this.progressBarNumber.length && this.progressValues.length !== 0) {
      return true;
    } else if (this.progressValues && this.progressBarNumber && this.progressValues.length !== this.progressBarNumber.length && this.progressValues.length !== 0 && this.progressBarNumber.length !== 0) {
      console.error("The number of progress bar is different of the number of values for progress bar");
      return false;
    } else {
      return false;
    }
  }

  /**
   * calculate the position of the progress bar (to be in the middle of the image)
   * half of the circle image height (10rem) + half of the progress bar height (1rem)
   */
  calcProgressBarPosition(): string {
    let margin: string;
    if ((this.steps.filter(item => item.caption)).length > 0 && this.captionPosition === CaptionPosition.BOTTOM) {
      margin = (this.stepsH / 2 + this.progressBarH / 2 + this.fontS + 1).toString();
    } else {
      margin = (this.stepsH / 2 + this.progressBarH / 2).toString();
    }
    return "-" + margin + "rem";

  }

  /**
   * Check the color and background color given by the user (if any) and set the DOM with these color
   * Due to the architecture of the component the progress bar may not be set during the check so a timeout has been added to wait
   * that the progress bar are rendered
   */
  verifyProgressBarColor(): void {
    let color = this.getRGBA(this.progressColor);
    let backgroundColor = this.getRGBA(this.progressBackgroundColor);
    if (color && this.element) {
      let progress = this.element.nativeElement.querySelectorAll(".progress-bar") as HTMLElement[];
      let colorRGBA = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
      progress.forEach((element) => {
        element.style.backgroundColor = colorRGBA;
      });
    }

    if (backgroundColor && this.element) {
      let progress = this.element.nativeElement.querySelectorAll(".progress") as HTMLElement[];
      let colorRGBA = "rgba(" + backgroundColor[0] + "," + backgroundColor[1] + "," + backgroundColor[2] + "," + backgroundColor[3] + ")";
      progress.forEach((element) => {
        element.style.backgroundColor = colorRGBA;
      });
    }
  }

  /**
   * Set the status box and its tip at the good place
   */
  setStatusBox(): void {
    if (this.direction === Direction.HORIZONTAL) {
      if (this.progressValue > 60) {
        this.arrowCssValue = "RIGHT";
      } else if (this.progressValue < 40) {
        this.arrowCssValue = "LEFT";
      } else {
        this.arrowCssValue = "MIDDLE";
      }

      if (this.statusBox) {
        if (this.arrowCssValue === "LEFT") {
          let widthBoxInPourcent = (((this.statusBox.nativeElement.offsetWidth - 4) * 0.15) + 2) * 100 / this.statusBox.nativeElement.parentElement.offsetWidth;
          this.statusBoxPadding = (this.progressValue - widthBoxInPourcent).toString();
          if (this.progressValue - widthBoxInPourcent < 0) {
            let progressInPx = this.progressValue * this.statusBox.nativeElement.parentElement.parentElement.offsetWidth / 100;
            let boxInPx = (this.statusBox.nativeElement.offsetWidth - 4) * 0.15 + 2;
            this.statusBox.nativeElement.style.marginLeft = (progressInPx - boxInPx).toString() + "px";
          }
        } else if (this.arrowCssValue === "MIDDLE") {
          let widthBoxInPourcent = (this.statusBox.nativeElement.offsetWidth) * 100 / (this.statusBox.nativeElement.parentElement.offsetWidth);
          this.statusBoxPadding = (this.progressValue - widthBoxInPourcent * 0.5).toString();
        } else {
          let widthBoxInPourcent = (((this.statusBox.nativeElement.offsetWidth - 4) * 0.85) + 2) * 100 / this.statusBox.nativeElement.parentElement.offsetWidth;
          this.statusBoxPadding = (this.progressValue - widthBoxInPourcent).toString();
        }
      } else {
        this.statusBoxPadding = this.progressValue.toString();
      }
    } else if (this.direction === Direction.VERTICAL) {
      if (this.statusPosition === StatusPosition.RIGHT) {
        this.arrowCssValue = "VERTICAL-RIGHT";
      } else if (this.statusPosition === StatusPosition.LEFT) {
        this.arrowCssValue = "VERTICAL-LEFT";
      }

      if (this.statusBox) {
        if (this.progressbarcontainer) {
          let heightContainer = this.progressbarcontainer.nativeElement.offsetHeight;
          this.statusBoxVerticalPos = (100 - this.progressValue) * heightContainer / 100 - this.statusBox.nativeElement.offsetHeight / 2 + Math.abs(this.statusBox.nativeElement.parentElement.parentElement.offsetHeight - this.statusBox.nativeElement.offsetHeight / 2);
          let captionWidth = 0;
          let childs = this.progressbarcontainer.nativeElement.children;
          for (let i = 0; i < childs.length; i++) {
            if (childs[i].children[0].children[0].children[0].offsetWidth > captionWidth) {
              captionWidth = childs[i].children[0].children[0].children[0].offsetWidth;
            }
          };
          let imgWidth = this.progressbarcontainer.nativeElement.children[0].children[0].children[0].children[1].children[0].offsetWidth;
          if (this.statusPosition === StatusPosition.LEFT) {
            if (this.captionPosition.toString() === this.statusPosition.toString()) {
              this.statusBoxHorizontalPos = 50 * this.progressbarcontainer.nativeElement.offsetWidth / 100 - captionWidth - imgWidth / 2 - 20 - this.statusBox.nativeElement.offsetWidth - 4;
            } else {
              this.statusBoxHorizontalPos = 50 * this.progressbarcontainer.nativeElement.offsetWidth / 100 - imgWidth / 2 - 20 - this.statusBox.nativeElement.offsetWidth - 4;
            }
          } else if (this.statusPosition === StatusPosition.RIGHT) {
            if (this.captionPosition.toString() === this.statusPosition.toString()) {
              this.statusBoxHorizontalPos = 50 * this.progressbarcontainer.nativeElement.offsetWidth / 100 + captionWidth + imgWidth / 2 + 20;
            } else {
              this.statusBoxHorizontalPos = 50 * this.progressbarcontainer.nativeElement.offsetWidth / 100 + imgWidth / 2 + 20;
            }
          }
        }
      }
    }
    this.cdRef.detectChanges();

  }

  /**
   * change the color of the status box borders
   * WARNING: this method add a rules to the global document stylesheet it could override css rule from other part of the application 
   */
  setStatusBoxBorder(): void {
    if (this.statusBorderColor && this.statusBox) {
      this.statusBox.nativeElement.style.borderColor = this.statusBorderColor;
      this.addCSSRule(document.styleSheets[0], ".arrow-tooltip:before", "border-bottom-color:" + this.statusBorderColor + "!important", 1);
    }
  }

  /**
   * Add a css rule in the given stylesheet (use with caution!!!!)
   * @param sheet sheet where insert the rules
   * @param selector selector to insert the rule (could be a class, id ...) (ex: "#myList li")
   * @param rules rules to insert (ex: "float: left; background: red !important;")
   * @param index the style position (in relation to styles of the same selector)
   */
  addCSSRule(sheet: any, selector: string, rules: string, index: number) {
    if ("insertRule" in sheet) {
      sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else if ("addRule" in sheet) {
      sheet.addRule(selector, rules, index);
    } else {
      console.error("Cannot add a css rules in this sheet", sheet);
    }
  }

  /** 
   * in case of vertical graphical view set the status box vertical position
   */
  calculateprogressVerticalPosition(): void {
    if (this.direction === Direction.VERTICAL) {
      this.widthProgressV = (this.progressBarL + this.stepsH) + "rem";
      this.paddingTopProgressV = this.progressBarL / 2 - this.progressBarH / 2 + "rem";
    }
  }

  /**
   * check the position inputs of the status box
   * @param value 
   */
  verifyStatusPositionInput(value: string): void {
    if (this.direction === Direction.HORIZONTAL) {
      if (value && (value === StatusPosition.BOTTOM || value === StatusPosition.TOP)) {
        this.statusPosition = value;
      } else {
        console.error("Wrong status position", value, "for direction", this.direction);
        this.statusPosition = StatusPosition.BOTTOM
      }
    } else if (this.direction === Direction.VERTICAL) {
      if (value && (value === StatusPosition.LEFT || value === StatusPosition.RIGHT)) {
        this.statusPosition = value;
      } else {
        console.error("Wrong status position", value, "for direction", this.direction);
        this.statusPosition = StatusPosition.RIGHT
      }
    }
  }

  /**
   * getRGBA:
   * Get the RGBA values of a color.
   * If input is not a color, returns NULL, else returns an array of 4 values:
   * red (0-255), green (0-255), blue (0-255), alpha (0-1)
   * @param value the value to analyze
   */
  getRGBA(value: string): any {
    if (!value) return null;
    // get/create a 0 pixel element at the end of the document, to use to test properties against the client browser
    let e = document.getElementById('test_style_element') as any;
    if (e == null) {
      e = document.createElement('span');
      e.id = 'test_style_element';
      e.style.width = 0;
      e.style.height = 0;
      e.style.borderWidth = 0;
      document.body.appendChild(e);
    }

    // use the browser to get the computed value of the input
    e.style.borderColor = '';
    e.style.borderColor = value;
    if (e.style.borderColor == '') {
      console.error("Invalid color: ", value);
      return null;
    }

    let computedStyle = window.getComputedStyle(e);
    let c: any;
    if (typeof computedStyle.borderBottomColor != 'undefined') {
      c = window.getComputedStyle(e).borderBottomColor;
    } else {
      c = window.getComputedStyle(e).borderColor;
    }
    let numbersAndCommas = c.replace(new RegExp('[^0-9.,]+', 'g'), '');
    let values = numbersAndCommas.split(',');
    for (let i = 0; i < values.length; i++)
      values[i] = Number(values[i]);
    if (values.length == 3) values.push(1);
    return values;
  }

}
