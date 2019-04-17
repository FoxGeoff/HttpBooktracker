import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { allBooks, allReaders } from 'app/data';
import { LoggerService } from './logger.service';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private loggerService: LoggerService) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    console.log('In getAllBooks()')
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Observable<Book> {
    console.log('In getBookById()')
    return this.http.get<Book>(`/api/books/${id}`);
  }
}
