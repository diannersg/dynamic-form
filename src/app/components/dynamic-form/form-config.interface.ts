import {FormFieldInterface} from '../fields/form-field.interface';

export interface FormConfigInterface {
  Title: string;
  Subtitle: string;
  Fields: FormFieldInterface[];
}
