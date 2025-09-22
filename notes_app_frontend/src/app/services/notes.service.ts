import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/**
 * PUBLIC_INTERFACE
 * NotesService provides CRUD operations for notes via REST API.
 * Endpoints (expected):
 *  - GET    /notes?query=&tag=&archived=&pinned=
 *  - GET    /notes/:id
 *  - POST   /notes
 *  - PUT    /notes/:id
 *  - DELETE /notes/:id
 *  - PATCH  /notes/:id/archive
 *  - PATCH  /notes/:id/pin
 * The base URL is configured via environment.API_BASE_URL.
 */
@Injectable({ providedIn: 'root' })
export class NotesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.API_BASE_URL}/notes`;

  list(params?: { query?: string; tag?: string; archived?: boolean; pinned?: boolean }): Observable<Note[]> {
    let httpParams = new HttpParams();
    if (params?.query) httpParams = httpParams.set('query', params.query);
    if (params?.tag) httpParams = httpParams.set('tag', params.tag);
    if (params?.archived !== undefined) httpParams = httpParams.set('archived', String(params.archived));
    if (params?.pinned !== undefined) httpParams = httpParams.set('pinned', String(params.pinned));

    return this.http.get<Note[]>(this.baseUrl, { params: httpParams }).pipe(
      catchError((_err) => {
        // Graceful fallback with mock data to keep UI functional without a backend.
        return of([
          {
            id: '1',
            title: 'Welcome to Ocean Professional',
            content: 'This is your first note. Use the top bar to create new notes.',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: [{ name: 'getting-started', color: '#2563EB' }],
            pinned: true,
            archived: false
          }
        ]);
      })
    );
  }

  get(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/${id}`);
  }

  create(payload: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  archive(id: string, archived: boolean): Observable<Note> {
    return this.http.patch<Note>(`${this.baseUrl}/${id}/archive`, { archived });
  }

  pin(id: string, pinned: boolean): Observable<Note> {
    return this.http.patch<Note>(`${this.baseUrl}/${id}/pin`, { pinned });
  }
}
