import {FormControl} from '@angular/forms';

export interface FormTypeInterface {
  Type: string;
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
}

export type FormFieldInterface = TextFieldInterface | H1FieldInterface | ButtonFieldInterface;
