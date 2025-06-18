import {Injectable, signal} from '@angular/core';
import {FormConfigInterface} from '../components/dynamic-form/form-config.interface';
import {FieldType} from '../components/fields/field-type.enum';
import { TextFieldInterface } from '../components/fields/form-field.interface';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {
  private formConfig = signal<FormConfigInterface>(
    {
      Title: "Tech assessment",
      Subtitle: "Dianne Gayeta",
      Fields: [
        {
          Type: "H1",
          Text: "Person name"
        },
        {
          ID: "person-name",
          Type: "Text",
          Placeholder: "John Smith",
        },
        {
          ID: "hello-button",
          Type: "Button",
          Title: "Say hi",
          AlertMessage: "Hello ${person-name}"
        },
      ]
    }
  );

  constructor() { }

  getFormConfig(): FormConfigInterface {
    return this.formConfig();
  }

  getFieldValue(id: string): string {
    return this.formConfig().Fields
      .filter(field => field.Type === FieldType.Text && (field as TextFieldInterface).ID === id)
      .map(field => (field as TextFieldInterface).Control?.value ?? '')
      .join(', ')
  }

  parseAlertMessage(message: string): string {
    return message.replace(/\${([^}]+)}/g, (match, fieldId) => this.getFieldValue(fieldId) || '');
  }
}
