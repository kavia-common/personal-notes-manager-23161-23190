import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';

/**
 * PUBLIC_INTERFACE
 * NotesListComponent displays a list of notes with a compact card layout.
 * Inputs:
 *  - notes: Note[]
 *  - loading: boolean
 * Outputs:
 *  - select(Note)
 *  - create()
 */
@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent {
  @Input() notes: Note[] = [];
  @Input() loading = false;
  @Output() select = new EventEmitter<Note>();
  @Output() create = new EventEmitter<void>();
}
