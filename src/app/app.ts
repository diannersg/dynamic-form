import { Component } from '@angular/core';
import {DynamicForm} from './components/dynamic-form/dynamic-form';

@Component({
  selector: 'app-root',
  imports: [DynamicForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
