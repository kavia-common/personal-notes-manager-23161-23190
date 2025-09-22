import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { NotesListComponent } from '../../components/notes-list/notes-list.component';
import { NoteEditorComponent } from '../../components/note-editor/note-editor.component';

/**
 * PUBLIC_INTERFACE
 * NotesPageComponent coordinates the notes list and the editor panes.
 * Handles loading, filtering, and selection state.
 */
@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [CommonModule, NotesListComponent, NoteEditorComponent],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.css'
})
export class NotesPageComponent implements OnInit {
  private notesService = inject(NotesService);

  notes = signal<Note[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  selectedNote = signal<Note | null>(null);

  // Simple filters state (can be extended)
  filters = signal<{ query?: string; tag?: string; archived?: boolean; pinned?: boolean }>({});

  filteredNotes = computed(() => {
    const list = this.notes();
    const { query, tag, archived, pinned } = this.filters();
    return list.filter(n => {
      if (archived !== undefined && !!n.archived !== archived) return false;
      if (pinned !== undefined && !!n.pinned !== pinned) return false;
      if (tag && !(n.tags || []).some(t => t.name.toLowerCase() === tag.toLowerCase())) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!(n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  });

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.loading.set(true);
    this.notesService.list(this.filters()).subscribe({
      next: (data) => {
        this.notes.set(data);
        if (!this.selectedNote() && data.length > 0) {
          this.selectedNote.set(data[0]);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load notes');
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  handleSelect(note: Note) {
    this.selectedNote.set(note);
  }

  handleCreate() {
    const newNote: Note = {
      title: 'Untitled',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: []
    };
    // Optimistically add to UI; in real app, call service.create
    this.notes.set([newNote, ...this.notes()]);
    this.selectedNote.set(newNote);
  }

  handleSave(note: Note) {
    // In real app, call update/create based on presence of id
    // Update local state for demo
    const list = this.notes().map(n => (n === this.selectedNote() ? note : n));
    this.notes.set(list);
    this.selectedNote.set(note);
  }

  handleDelete(note: Note) {
    const list = this.notes().filter(n => n !== note);
    this.notes.set(list);
    this.selectedNote.set(list[0] || null);
  }

  applyFilters(filters: { query?: string; tag?: string; archived?: boolean; pinned?: boolean }) {
    this.filters.set(filters);
    this.loadNotes();
  }
}
