import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnDestroy,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-detection-default',
  imports: [],
  templateUrl: './change-detection-default.component.html',
  styleUrl: './change-detection-default.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChangeDetectionDefaultComponent implements DoCheck, OnDestroy {
  private readonly http = inject(HttpClient);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  count = 0;

  checkCount = 0;

  ngDoCheck(): void {
    this.checkCount++;

    // eslint-disable-next-line no-console
    console.log(`Change Detection №${this.checkCount}`);
  }

  changeByClick(): void {
    console.warn('--- CLICK ---');
    this.count++;
  }

  changeByTimeout(): void {
    console.warn('--- TIMEOUT START ---');

    setTimeout(() => {
      console.warn('--- TIMEOUT CALLBACK ---');
      this.count++;
    }, 1000);
  }

  changeByPromise(): void {
    console.warn('--- PROMISE START ---');

    Promise.resolve().then(() => {
      console.warn('--- PROMISE CALLBACK ---');
      this.count++;
    });
  }

  changeByHttpClient(): void {
    console.warn('--- HTTP START ---');

    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe(() => {
        console.warn('--- HTTP RESPONSE ---');
        this.count++;
      });
  }

  startInterval(): void {
    if (this.intervalId !== null) {
      return;
    }

    console.warn('--- INTERVAL START ---');

    this.intervalId = setInterval(() => {
      console.warn('--- INTERVAL TICK ---');
      this.count++;
    }, 1000);
  }

  stopInterval(): void {
    if (this.intervalId === null) {
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset(): void {
    this.count = 0;
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }
}
