import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExcelEditorComponent } from "./excel-editor/excel-editor.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ExcelEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'excel-editor-app';
}
