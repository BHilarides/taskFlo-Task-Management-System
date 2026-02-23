import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseUrl = `${environment.apiBaseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.baseUrl);
  }

  createTask(task: any) {
    return this.http.post(this.baseUrl, task);
  }
}
