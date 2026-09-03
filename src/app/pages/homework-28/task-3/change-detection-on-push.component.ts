import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-change-detection-on-push',
  imports: [],
  templateUrl: './change-detection-on-push.component.html',
  styleUrl: './change-detection-on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetectionOnPushComponent implements DoCheck, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly ngZone = inject(NgZone);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  count = 0;

  checkCount = 0;

  ngDoCheck(): void {
    this.checkCount++;

    // eslint-disable-next-line no-console
    console.log(`OnPush Change Detection №${this.checkCount}`);
  }

  changeWithoutMarkForCheck(): void {
    console.warn('--- WITHOUT markForCheck START ---');

    setTimeout(() => {
      this.count++;
      console.warn('--- COUNT CHANGED WITHOUT markForCheck ---');
    }, 1000);
  }

  changeWithMarkForCheck(): void {
    console.warn('--- markForCheck START ---');

    setTimeout(() => {
      this.count++;
      console.warn('--- COUNT CHANGED + markForCheck ---');

      this.cdr.markForCheck();
    }, 1000);
  }

  changeWithDetectChanges(): void {
    console.warn('--- detectChanges START ---');

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.count++;

        console.warn(`--- BEFORE detectChanges: count=${this.count} ---`);

        this.cdr.detectChanges();

        console.warn(`--- AFTER detectChanges: count=${this.count} ---`);
      }, 1000);
    });
  }

  detachView(): void {
    console.warn('--- DETACH ---');
    this.cdr.detach();
  }

  changeDetachedByClick(): void {
    this.count++;
    console.warn(`--- DETACHED CLICK: count=${this.count} ---`);
  }

  changeDetachedByTimeout(): void {
    setTimeout(() => {
      this.count++;
      console.warn(`--- DETACHED TIMEOUT: count=${this.count} ---`);
    }, 1000);
  }

  changeDetachedByPromise(): void {
    Promise.resolve().then(() => {
      this.count++;
      console.warn(`--- DETACHED PROMISE: count=${this.count} ---`);
    });
  }

  startDetachedInterval(): void {
    if (this.intervalId !== null) {
      return;
    }

    let ticks = 0;

    this.intervalId = setInterval(() => {
      ticks++;
      this.count++;

      console.warn(
        `--- DETACHED INTERVAL TICK ${ticks}: count=${this.count} ---`,
      );

      if (ticks === 3) {
        this.stopDetachedInterval();
      }
    }, 1000);
  }

  reattachView(): void {
    console.warn('--- REATTACH ---');
    this.cdr.reattach();
  }

  stopDetachedInterval(): void {
    if (this.intervalId === null) {
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  ngOnDestroy(): void {
    this.stopDetachedInterval();
  }

  reset(): void {
    this.count = 0;
  }
}
