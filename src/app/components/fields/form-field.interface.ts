import {FormControl} from '@angular/forms';
import {FieldType} from './field-type.enum';

export interface FormTypeInterface {
  Type: FieldType;
}

export interface TextFieldInterface extends FormTypeInterface {
  ID: string;
  Placeholder: string;
  Control?: FormControl<string | null>;
  Value?: string;
}

export interface H1FieldInterface extends FormTypeInterface {
  Text: string;
}

export interface ButtonFieldInterface extends FormTypeInterface {
  ID: string;
  Title: string;
  AlertMessage: string;
  VisibleCondition: ConditionInterface;
  Show?: boolean
}

export interface ConditionInterface {
  ID: string;
  Value: string;
  Operator: string;
}

export type FormFieldInterface = TextFieldInterface | H1FieldInterface | ButtonFieldInterface;
