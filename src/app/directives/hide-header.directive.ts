import { AfterViewInit, Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';
import { isPlatform } from '@ionic/core';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements AfterViewInit {

  @Input('appHideHeader') header: any;
  private headerHeight = isPlatform('ios') ? 44 : 56;
  private children: any;
  
  constructor(
    private rendered: Renderer2,
    private domCtrl: DomController
  ) { }

  ngAfterViewInit() : void {
    this.header = this.header.el;
    this.children = this.header.children;
    // console.log('this.header: ', this.header);
    // console.log('this.children: ', this.children);
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    // console.log($event);
    const scrollTop: number = $event.detail.scrollTop;
    let newPosition = -scrollTop;

    if (newPosition < -this.headerHeight) {
      newPosition = -this.headerHeight;
    }

    let newOpacity = 1 - (newPosition / -this.headerHeight);

    this.domCtrl.write(() => {
      this.rendered.setStyle(this.header, 'top', newPosition + 'px');
      for (let c of this.children) {
        this.rendered.setStyle(c, 'opacity', newOpacity);
      }
    });
  }

}
