// pet-forum.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PetPost, HelpPost } from './pet-forum.models';

@Injectable({
  providedIn: 'root'
})
export class PetForumService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // ─── Posts ───────────────────────────────────────────────────────────────

  getPosts(location?: string): Observable<PetPost[]> {
    let params = new HttpParams().set('_sort', 'createdAt').set('_order', 'desc');
    if (location) {
      params = params.set('location', location);
    }
    return this.http.get<PetPost[]>(`${this.baseUrl}/posts`, { params });
  }

  createPost(post: Omit<PetPost, 'id'>): Observable<PetPost> {
    return this.http.post<PetPost>(`${this.baseUrl}/posts`, post);
  }

  // ─── Questions ───────────────────────────────────────────────────────────

  getQuestions(location?: string): Observable<HelpPost[]> {
    let params = new HttpParams().set('_sort', 'createdAt').set('_order', 'desc');
    if (location) {
      params = params.set('location', location);
    }
    return this.http.get<HelpPost[]>(`${this.baseUrl}/questions`, { params });
  }

  createQuestion(question: Omit<HelpPost, 'id'>): Observable<HelpPost> {
    return this.http.post<HelpPost>(`${this.baseUrl}/questions`, question);
  }
}
