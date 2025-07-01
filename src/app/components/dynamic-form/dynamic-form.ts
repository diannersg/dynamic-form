import {Component, inject, OnInit, signal} from '@angular/core';
import {FieldType} from '../fields/field-type.enum';
import {FormConfigInterface} from './form-config.interface';
import {H1Field} from '../fields/h1-field/h1-field';
import {TextField} from '../fields/text-field/text-field';
import {ButtonField} from '../fields/button-field/button-field';
import {FormConfigService} from '../../services/form-config.service';
import {TextFieldInterface} from '../fields/form-field.interface';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    H1Field,
    TextField,
    ButtonField,
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss'
})
export class DynamicForm implements OnInit {
  fieldType = FieldType;
  private formConfigService = inject(FormConfigService);
  form = this.formConfigService.formConfig;

  ngOnInit(): void {
    this.formConfigService.loadFormConfig()
      .subscribe(((resp) => this.initializeConfig(resp)));
  }

  initializeConfig(resp: FormConfigInterface) {
    resp.Fields.forEach(field => {
      if(field.Type === FieldType.Text) {
        const textField = field as TextFieldInterface;
        textField.Control = new FormControl<string>(textField.Value ?? '');
      }
    })
    this.formConfigService.setFormConfig(resp);
  }
}
