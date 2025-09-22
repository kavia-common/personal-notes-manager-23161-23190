import { Routes } from '@angular/router';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'notes' },
  { path: 'notes', component: NotesPageComponent },
  { path: '**', redirectTo: 'notes' }
];
