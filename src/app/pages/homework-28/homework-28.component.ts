import { Component } from '@angular/core';
import { ParentComponent } from './task-1/parent.component';
import { ChangeDetectionDefaultComponent } from './task-2/change-detection-default.component';
import { ChangeDetectionOnPushComponent } from './task-3/change-detection-on-push.component';

@Component({
  selector: 'app-homework-28',
  imports: [
    ParentComponent,
    ChangeDetectionDefaultComponent,
    ChangeDetectionOnPushComponent,
  ],
  templateUrl: './homework-28.component.html',
  styleUrl: './homework-28.component.scss',
})
export class Homework28Component {}
