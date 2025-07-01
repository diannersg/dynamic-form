import {computed, inject, Injectable, signal} from '@angular/core';
import {FormConfigInterface} from '../components/dynamic-form/form-config.interface';
import {FieldType} from '../components/fields/field-type.enum';
import {ButtonFieldInterface, TextFieldInterface} from '../components/fields/form-field.interface';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {
  private httpClient = inject(HttpClient);
  private _formConfig = signal<FormConfigInterface | undefined>(undefined);
  readonly formConfig = computed(() => this._formConfig());

  loadFormConfig(): Observable<FormConfigInterface> {
    return this.httpClient.get<FormConfigInterface>('/form.json')
  }

  setFormConfig(form: FormConfigInterface) {
    return this._formConfig.set(form);
  }

  getFieldValue(id: string): string | undefined {
    return this.formConfig()?.Fields
      .filter(field => field.Type === FieldType.Text && (field as TextFieldInterface).ID === id)
      .map(field => (field as TextFieldInterface).Control?.value ?? '')
      .join(', ')
  }

  parseAlertMessage(message: string): string {
    return message.replace(/\${([^}]+)}/g, (match, fieldId) => this.getFieldValue(fieldId) || '');
  }

  TextValueUpdate(id: string, value: string) {
    this._formConfig.update((formConfigValue) => {

      if (formConfigValue) {
        const newValue = {...formConfigValue}
        const button =  newValue.Fields
          .find(field => field.Type === FieldType.Button && (field as ButtonFieldInterface).VisibleCondition.ID === id) as ButtonFieldInterface;

        button.Show = button.VisibleCondition.Operator === "Equals" ? button.VisibleCondition.Value === value : button.VisibleCondition.Value !== value;

        return newValue;
      }

      return formConfigValue;
    })
  }

  getButton(id: string) {
    return this.formConfig()?.Fields
      .find(field => field.Type === FieldType.Button && (field as ButtonFieldInterface).VisibleCondition.ID === id)
  }

  getButtonIndex(id: string) {
    return this.formConfig()?.Fields.findIndex(field => field.Type === FieldType.Button && (field as ButtonFieldInterface).VisibleCondition.ID === id)
  }
}
