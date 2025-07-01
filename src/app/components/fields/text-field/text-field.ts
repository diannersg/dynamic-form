import {Component, effect, inject, input, OnInit,} from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import {FormFieldInterface, TextFieldInterface} from '../form-field.interface';
import {FormConfigService} from '../../../services/form-config.service';

@Component({
  selector: 'app-text-field',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss'
})
export class TextField implements OnInit {
  private service = inject(FormConfigService)
  field = input<TextFieldInterface, FormFieldInterface>(
    undefined,
    {transform: (field: FormFieldInterface) => field as TextFieldInterface}
  );

  ngOnInit(): void {
    this.field()?.Control?.valueChanges.subscribe(value => {
      this.service.TextValueUpdate(this.field()!.ID, value ?? '')
    })
  }

}
