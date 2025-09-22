import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';

/**
 * PUBLIC_INTERFACE
 * NoteEditorComponent provides editing UI for a single note.
 * Inputs:
 *  - note: Note
 * Outputs:
 *  - save(Note)
 *  - delete(Note)
 */
@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css'
})
export class NoteEditorComponent {
  @Input() note!: Note;

  @Output() save = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<Note>();

  onSave() {
    const now = new Date().toISOString();
    const updated: Note = { ...this.note, updatedAt: now };
    this.save.emit(updated);
  }

  onDelete() {
    this.delete.emit(this.note);
  }
}
