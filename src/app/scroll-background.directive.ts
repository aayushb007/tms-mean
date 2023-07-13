import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollBackground]'
})
export class ScrollBackgroundDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.isContentOverflow()) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.renderer.setStyle(this.el.nativeElement, 'background-position-y', `${scrollTop / 2}px`);
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'background-position-y', '0');
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateMinHeight();
  }

  ngAfterViewInit() {
    this.updateMinHeight();
  }

  private updateMinHeight() {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    this.renderer.setStyle(this.el.nativeElement, 'min-height', `${windowHeight}px`);
  }

  private isContentOverflow(): boolean {
    const el = this.el.nativeElement;
    return el.scrollHeight > el.clientHeight;
  }
}
