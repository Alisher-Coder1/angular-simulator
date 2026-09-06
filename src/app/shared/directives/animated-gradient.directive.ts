import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appAnimatedGradient]',
})
export class AnimatedGradientDirective implements OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly renderer = inject(Renderer2);

  private animationId: number | null = null;

  private backgroundPosition = 0;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background',
      'linear-gradient(90deg, #ff5f6d, #ffc371, #47c6ef, #845ec2)',
    );

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-size',
      '300% 100%',
    );

    this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#ffffff');

    this.startAnimation();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.stopAnimation();

    this.renderer.removeStyle(this.elementRef.nativeElement, 'background');

    this.renderer.removeStyle(this.elementRef.nativeElement, 'background-size');

    this.renderer.removeStyle(
      this.elementRef.nativeElement,
      'background-position',
    );

    this.renderer.removeStyle(this.elementRef.nativeElement, 'color');
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  private startAnimation(): void {
    this.stopAnimation();

    const animate = (): void => {
      this.backgroundPosition = (this.backgroundPosition + 0.5) % 100;

      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background-position',
        `${this.backgroundPosition}% 50% `,
      );

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  private stopAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.backgroundPosition = 0;
  }
}
