import { Component, OnInit, Input, AfterViewChecked, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CaptionPosition } from '../models/caption-position.model';
import { Direction } from '../models/direction.model';

@Component({
  selector: 'graphical-view-item',
  template: `<div *ngIf="item && direction === 'HORIZONTAL'" class="row">
  <div id="circle" class="m-auto p-0">
    <p *ngIf="item.caption && captionPosition === 'TOP'" class="m-0 p-0 caption-img" [style.line-height.rem]="fontS+1" [style.font-size.rem]="fontS"
      [style.color]="captionColor">
      {{item.caption}}
    </p>
    <img *ngIf="!(value && value!==0 && item.imageComplete)" [style.height]="stepH+'rem'" class="circle-img" src={{item.image}}>
    <img *ngIf="value && value!==0 && item.imageComplete" [style.height]="stepH+'rem'" class="circle-img" src={{item.imageComplete}}>
    <p *ngIf="item.caption && captionPosition === 'BOTTOM'" class="m-0 p-0 caption-img" [style.line-height.rem]="fontS+1" [style.font-size.rem]="fontS"
      [style.color]="captionColor">
      {{item.caption}}
    </p>
  </div>
</div>

<div *ngIf="item && direction === 'VERTICAL'" class="row vertical-container" [style.margin-top]="0">
    <p #captionImg *ngIf="item.caption" class="m-auto p-2 caption-img caption-img-vertical" [style.line-height.rem]="fontS+1" [style.font-size.rem]="fontS"
    [style.color]="captionColor" [style.left]="captionVposition">
    {{item.caption}}
  </p>
  <div id="circle" class="m-auto p-0 flex-container">
    
    <img *ngIf="!(value && value!==0 && item.imageComplete)" [style.width]="stepH+'rem'" class="circle-img m-auto" src={{item.image}}>
    <img *ngIf="value && value!==0 && item.imageComplete" [style.width]="stepH+'rem'" class="circle-img m-auto" src={{item.imageComplete}}>
    <!-- <p *ngIf="item.caption && captionPosition === 'RIGHT'" class="m-auto p-2 caption-img" [style.line-height.rem]="fontS+1" [style.font-size.rem]="fontS"
      [style.color]="captionColor">
      {{item.caption}}
    </p> -->
  </div>
</div>`,
  styles: [`#circle{
    text-align: center;
    z-index: 200;
}
    
#progress{
z-index: 100;
}

.caption-img{
    white-space: nowrap;
}

.flex-container{
    display: flex;
    flex-direction: row;

}

.vertical-container{
    position: relative;
}

.caption-img-vertical{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
}
       `]
})
export class GraphicalViewItemComponent implements AfterViewChecked {

  @Input("item") item: any;

  @Input("value") value: number = 0;

  @Input("height") stepH: number = 10;

  @Input("font-size") fontS: number = 1;

  @Input("caption-position") captionPosition: CaptionPosition = CaptionPosition.BOTTOM;

  @Input("caption-color") captionColor: string = "black";

  @Input("direction") direction: Direction = Direction.HORIZONTAL;

  @ViewChild("captionImg") captionImg: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngOnChanges() {
    this.calculateCaptionPosition();
  }

  ngAfterViewChecked() {
    this.calculateCaptionPosition();
  }

  calculateCaptionPosition() {
    if (this.captionImg) {
      let calculateLeft;
      if (this.captionPosition === 'LEFT') {
        calculateLeft = "calc(50% - " + this.captionImg.nativeElement.offsetWidth + "px - " + this.stepH / 2 + "rem)";
      } else if (this.captionPosition === 'RIGHT') {
        calculateLeft = "calc(50% + " + this.stepH / 2 + "rem)";
      } else {
        console.error("Wrong position for the caption", this.captionPosition);
        return;
      }
      this.renderer.setStyle(this.captionImg.nativeElement, "left", calculateLeft);
    }
  }

}
