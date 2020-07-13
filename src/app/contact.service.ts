import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Contact } from './models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myApiUrl = "https://v1demoapp.azurewebsites.net/api/ContactsAPI/";
   }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(this.myApiUrl + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  saveContact(Contact): Observable<Contact> {
    return this.http.post<Contact>(this.myApiUrl, JSON.stringify(Contact), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateContact(id: number, Contact): Observable<Contact> {
    return this.http.put<Contact>(this.myApiUrl + id, JSON.stringify(Contact), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<Contact>(this.myApiUrl + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}
