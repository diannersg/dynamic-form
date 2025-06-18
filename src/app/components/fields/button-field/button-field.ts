import {Component, inject, input} from '@angular/core';
import {ButtonFieldInterface, FormFieldInterface} from '../form-field.interface';
import {FormConfigService} from '../../../services/form-config.service';

@Component({
  selector: 'app-button-field',
  imports: [],
  templateUrl: './button-field.html',
  styleUrl: './button-field.scss'
})
export class ButtonField {
  formConfigService = inject(FormConfigService);

  field = input<ButtonFieldInterface, FormFieldInterface>(
    undefined,
    {transform: (field: FormFieldInterface) => field as ButtonFieldInterface}
  );

  onClick() {
    alert(this.formConfigService.parseAlertMessage(this.field()?.AlertMessage ?? ''));
  }
}
