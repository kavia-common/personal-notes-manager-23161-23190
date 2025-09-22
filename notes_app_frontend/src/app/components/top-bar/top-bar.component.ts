import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * PUBLIC_INTERFACE
 * TopBarComponent shows quick actions: add note, search field.
 * Emits createRequested event when user wants to create a new note.
 */
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  @Output() createRequested = new EventEmitter<void>();
  query = '';

  onCreate() {
    this.createRequested.emit();
  }
}
