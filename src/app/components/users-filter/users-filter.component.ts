import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  @Output() filterUsers = new EventEmitter<string>();

  public readonly searchControl = new FormControl('', {
    nonNullable: true,
  });

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        map((value: string) => value.trim().toLowerCase()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((searchValue: string) => {
        this.filterUsers.emit(searchValue);
      });
  }
}