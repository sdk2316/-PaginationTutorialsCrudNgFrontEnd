import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:9090/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/getTutorialsWithTilte`);
  }
  get(id:number): Observable<any> {
    return this.http.get(`${baseUrl}/getTutorialById/${id}`);
  }
  create(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/createTutorial`, data);
  }
  update(id:number, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateTutorialById/${id}`, data);
  }
  delete(id:number): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteTutorialById/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteAllTutorials`);
  }
  findByTitle(title:string): Observable<any> {
    return this.http.get(`${baseUrl}/getTutorialsWithTilte?title=${title}`);
  }
}
