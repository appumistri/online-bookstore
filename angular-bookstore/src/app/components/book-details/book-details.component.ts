import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () => this.bookDetails()
    )
  }

  bookDetails() {
    const bookId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.bookService.getBookDetails(bookId).subscribe(
      data => this.book = data
    )
  }
}
