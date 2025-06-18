import {Component, input} from '@angular/core';
import {FormFieldInterface, H1FieldInterface} from '../form-field.interface';

@Component({
  selector: 'app-h1-field',
  imports: [],
  template: `<h1>{{ field()?.Text }}</h1>`,
  styleUrl: './h1-field.scss'
})
export class H1Field  {
  field = input<H1FieldInterface, FormFieldInterface >(
    undefined,
    {transform: (field: FormFieldInterface) => field as H1FieldInterface}
  );
}
