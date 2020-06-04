import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public books: Book[];
  private categoryId: number;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

  listBooks() {
    const isSearch = this.activatedRoute.snapshot.paramMap.has('keyword')

    if (!isSearch) {
      this.handleBookList();
    } else {
      this.handleBookSearch();
    }
  }

  handleBookList() {
    const hasCategoryId = this.activatedRoute.snapshot.paramMap.has('id')

    if (hasCategoryId) {
      this.categoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.categoryId = 1;
    }

    this.bookService.getBooks(this.categoryId).subscribe(
      data => this.books = data
    )
  }

  handleBookSearch() {
    const keyword = this.activatedRoute.snapshot.paramMap.get('keyword');

    this.bookService.searchBooks(keyword).subscribe(
      data => this.books = data
    )
  }
}
