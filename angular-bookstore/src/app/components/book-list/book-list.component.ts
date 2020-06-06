import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Book } from 'src/app/common/book';
import { CartItem } from 'src/app/common/cart-item';
import { BookService, GetBookResponse } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  categoryId: number = 1;
  keyword: string = "";
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;
  totalBooks: number = 0;

  oldCategoryId: number = 1;
  oldKeyword: string = "";

  constructor(private bookService: BookService, private cartService: CartService,
    private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

  listBooks() {
    this.spinner.show();
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

      if (this.oldCategoryId != this.categoryId) {
        this.currentPage = 1;
      }

      this.bookService.getBooksByCategory(this.categoryId, this.currentPage - 1, this.pageSize).subscribe(
        data => this.handlePagination(data)
      )
      this.oldCategoryId = this.categoryId;
    } else {
      this.bookService.getBooks(this.currentPage - 1, this.pageSize).subscribe(
        data => this.handlePagination(data)
      )
    }
  }

  handleBookSearch() {
    this.keyword = this.activatedRoute.snapshot.paramMap.get('keyword');

    if (this.oldKeyword != this.keyword) {
      this.currentPage = 1;
    }

    this.bookService.searchBooks(this.keyword, this.currentPage - 1, this.pageSize).subscribe(
      data => this.handlePagination(data)
    )
    this.oldKeyword = this.keyword;
  }

  updatePageSize(pageSize: number) {
    this.pageSize = +pageSize;
    this.listBooks();
  }

  handlePagination(data: GetBookResponse) {
    this.books = data._embedded.books;
    this.pageSize = data.page.size;
    this.totalBooks = data.page.totalElements;
    this.totalPages = data.page.totalPages;
    this.currentPage = data.page.number + 1;
    this.spinner.hide();
  }

  addToCart(book: Book) {
    let item = new CartItem(book);
    this.cartService.addToCart(item);
  }
}
