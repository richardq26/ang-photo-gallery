import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../interfaces/photo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  uri = 'http://localhost:3000/api/photos';
  constructor(private http: HttpClient) { }

  createPhoto(title: string, description: string, photo: File){
    const fd = new FormData();
    // Agregamos nuevos campos al form
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.post(this.uri, fd);
  }

  getPhotos(): Observable<any>{
    return this.http.get<Photo[]>(this.uri);
  }

  getPhoto(id: string): Observable<any>{
    return this.http.get<Photo>(`${this.uri}/${id}`);
  }

  deletePhoto(id: string): Observable<any>{
    return this.http.delete(`${this.uri}/${id}`);
  }

  updatePhoto(id: string, title: string, description: string): Observable<any>{
    return this.http.put(`${this.uri}/${id}`, {title, description});
  }
}
