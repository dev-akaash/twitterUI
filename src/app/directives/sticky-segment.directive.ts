import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { isPlatform, DomController } from '@ionic/angular';

@Directive({
  selector: '[appStickySegment]'
})
export class StickySegmentDirective {

  @Input('appStickySegment') segment: any;
  private headerHeight = isPlatform('ios') ? 44 : 56;
  private children: any;
  
  constructor(
    private rendered: Renderer2,
    private domCtrl: DomController
  ) { }

  ngAfterViewInit() : void {
    this.segment = this.segment.el;
    // console.log('this.header: ', this.header);
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    // console.log($event);
    const scrollTop: number = $event.detail.scrollTop;
    let newPosition = -scrollTop;

    if (newPosition < -this.headerHeight) {
      newPosition = -this.headerHeight;
    }
    
    this.domCtrl.write(() => {
      this.rendered.setStyle(this.segment, 'top', newPosition + 'px');
    });
  }

}
