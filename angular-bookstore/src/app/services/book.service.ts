import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksUrl: string = "http://localhost:8080/api/v1/books";
  private bookCategoryUrl: string = "http://localhost:8080/api/v1/book-category";

  constructor(private httpClient: HttpClient) { }

  getBooks(categoryId: number): Observable<Book[]> {
    const searchUrl = `${this.booksUrl}/search/categoryid?id=${categoryId}`;
    return this.httpClient.get<GetBookResponse>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }

  getBookCategory(): Observable<BookCategory[]> {
    return this.httpClient.get<GetBookCategoryresponse>(this.bookCategoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    )
  }

  searchBooks(keyword: string): Observable<Book[]> {
    const searchUrl = `${this.booksUrl}/search/searchByKeyword?name=${keyword}`;
    return this.httpClient.get<GetBookResponse>(searchUrl).pipe(
      map(response => response._embedded.books)
    )
  }

  getBookDetails(id: number) {
    const bookDetsildUrl = `${this.booksUrl}/${id}`;
    return this.httpClient.get<Book>(bookDetsildUrl);
  }
}

interface GetBookResponse {
  _embedded: {
    books: Book[];
  }
}

interface GetBookCategoryresponse {
  _embedded: {
    bookCategory: BookCategory[];
  }
}
