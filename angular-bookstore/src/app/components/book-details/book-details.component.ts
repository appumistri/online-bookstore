import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Book } from 'src/app/common/book';
import { CartItem } from 'src/app/common/cart-item';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;

  constructor(private bookService: BookService, private cartService: CartService,
    private location: Location, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () => this.bookDetails()
    )
  }

  goBack() {
    this.location.back();
  }

  bookDetails() {
    this.spinner.show();
    const bookId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.bookService.getBookDetails(bookId).subscribe(
      data => {
        this.book = data;
        this.spinner.hide();
      }
    )
  }

  addToCart(book: Book) {
    let item = new CartItem(book);
    this.cartService.addToCart(item);
  }
}
