import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  private readonly formBuilder = new FormBuilder();

  @Output() createUser = new EventEmitter<User>();

  public readonly userForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    username: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    website: [''],
    city: [''],
    street: [''],
    suite: [''],
    zipcode: [''],
    lat: [''],
    lng: [''],
    companyName: [''],
    catchPhrase: [''],
    bs: [''],
  });

  public onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.getRawValue();

    const newUser: User = {
      id: Date.now(),
      name: formValue.name,
      username: this.getValueOrUnknown(formValue.username),
      email: formValue.email,
      phone: this.getValueOrUnknown(formValue.phone),
      website: this.getValueOrUnknown(formValue.website),
      address: {
        city: this.getValueOrUnknown(formValue.city),
        street: this.getValueOrUnknown(formValue.street),
        suite: this.getValueOrUnknown(formValue.suite),
        zipcode: this.getValueOrUnknown(formValue.zipcode),
        geo: {
          lat: this.getValueOrUnknown(formValue.lat),
          lng: this.getValueOrUnknown(formValue.lng),
        },
      },
      company: {
        name: this.getValueOrUnknown(formValue.companyName),
        catchPhrase: this.getValueOrUnknown(formValue.catchPhrase),
        bs: this.getValueOrUnknown(formValue.bs),
      },
    };

    this.createUser.emit(newUser);
    this.userForm.reset();
  }

  private getValueOrUnknown(value: string): string {
    return value.trim() || 'Неизвестно';
  }
}