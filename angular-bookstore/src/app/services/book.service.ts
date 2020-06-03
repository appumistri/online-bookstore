import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl: string = "http://localhost:8080/api/v1/books";

  constructor(private httpClient: HttpClient) { }

  getBooks(categoryId: number): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${categoryId}`;
    return this.httpClient.get<GetBookResponse>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }
}

interface GetBookResponse {
  _embedded: {
    books: Book[];
  }
}
