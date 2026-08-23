import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appBoldHover]',
})
export class BoldHoverDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly renderer = inject(Renderer2);

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', '700');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'font-weight');
  }
}
