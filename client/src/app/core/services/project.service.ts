import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private baseUrl = `${environment.apiBaseUrl}/projects`;

  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get(this.baseUrl)
  }

  createProject(project: any): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}/projects`,
      project
    );
  }

}
