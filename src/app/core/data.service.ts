import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, ObservableInput } from 'rxjs';

import { allBooks, allReaders } from 'app/data';
import { LoggerService } from './logger.service';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { BookTrackerError } from 'app/models/bookTrackerError';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private loggerService: LoggerService) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[]> {
    console.log('In getAllReaders()');
    return this.http.get<Reader[]>('/api/readers');
  }

  getReaderById(id: number): Observable<Reader> {
    console.log('In getReaderById()');
    return this.http.get<Reader>(`/api/readers/${id}`);
  }
  
  getAllBooks(): Observable< Book[] | BookTrackerError> {
    console.log('In getAllBooks()'); 
    return this.http.get<Book[]>('/api/books')
      .pipe(
        catchError(err => this.handleHttpError(err)) 
      );
  }
 
  private handleHttpError(err: HttpErrorResponse): ObservableInput<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = err.statusText;
    dataError.friendlyMessage = 'An error occured retriving data';
    return throwError(dataError);
  }

  getBookById(id: number): Observable<Book> {
    console.log('In getBookById()');
    return this.http.get<Book>(`/api/books/${id}`,
      {
        headers: new HttpHeaders({
          'Accept': 'application/jason',
          'Authorization': 'my-token'
        })
      }
    );
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookID}`);
  }
}
