import {Component, input} from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import {FormFieldInterface, TextFieldInterface} from '../form-field.interface';

@Component({
  selector: 'app-text-field',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss'
})
export class TextField {
  field = input<TextFieldInterface, FormFieldInterface>(
    undefined,
    {transform: (field: FormFieldInterface) => field as TextFieldInterface}
  );
}
