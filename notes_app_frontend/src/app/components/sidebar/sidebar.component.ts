import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';

/**
 * PUBLIC_INTERFACE
 * SidebarComponent offers navigation sections and filters, plus a create button proxy.
 * Emits filter changes via outputs for parent components if needed in future.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private notesService = inject(NotesService);

  @Output() filterChanged = new EventEmitter<{ query?: string; tag?: string; archived?: boolean; pinned?: boolean }>();
  selected: string = 'all';
  tags: string[] = ['work', 'personal', 'ideas', 'tasks'];

  triggerCreate() {
    // In case sidebar needs to handle local creation (future extension)
    // For now, this method is called from top-bar and handled in notes page via an event bus if needed.
  }

  select(filter: string) {
    this.selected = filter;
    switch (filter) {
      case 'all':
        this.filterChanged.emit({});
        break;
      case 'pinned':
        this.filterChanged.emit({ pinned: true });
        break;
      case 'archived':
        this.filterChanged.emit({ archived: true });
        break;
    }
  }

  applyTag(tag: string) {
    this.selected = `tag:${tag}`;
    this.filterChanged.emit({ tag });
  }
}
